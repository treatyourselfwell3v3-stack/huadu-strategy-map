'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import strategyData from '../data/strategy.json';

type StrategyNode = d3.SimulationNodeDatum & {
  id: string;
};

type StrategyLink = d3.SimulationLinkDatum<StrategyNode> & {
  source: string | StrategyNode;
  target: string | StrategyNode;
};

const width = 1000;
const height = 600;

export default function StrategyGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const nodes: StrategyNode[] = strategyData.nodes.map((n) => ({ ...n }));
    const links: StrategyLink[] = strategyData.links.map((l) => ({ ...l }));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const zoomLayer = svg.append('g');

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'fixed')
      .style('padding', '6px 10px')
      .style('background', '#111827')
      .style('color', '#fff')
      .style('border-radius', '8px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', '0');

    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on('zoom', (event) => {
        zoomLayer.attr('transform', event.transform.toString());
      });

    svg.call(zoomBehavior);

    const link = zoomLayer
      .append('g')
      .attr('stroke', '#94a3b8')
      .attr('stroke-opacity', 0.7)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    const node = zoomLayer
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 16)
      .attr('fill', '#2563eb')
      .style('cursor', 'grab');

    const label = zoomLayer
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d) => d.id)
      .attr('font-size', 12)
      .attr('font-weight', 600)
      .attr('fill', '#0f172a')
      .attr('dx', 20)
      .attr('dy', 4);

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(nodes, links).id((d) => d.id).distance(160))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<StrategyNode>(28));

    function drag(sim: d3.Simulation<StrategyNode, StrategyLink>) {
      function dragstarted(event: d3.D3DragEvent<SVGCircleElement, StrategyNode, StrategyNode>, d: StrategyNode) {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: d3.D3DragEvent<SVGCircleElement, StrategyNode, StrategyNode>, d: StrategyNode) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: d3.D3DragEvent<SVGCircleElement, StrategyNode, StrategyNode>, d: StrategyNode) {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag<SVGCircleElement, StrategyNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    node
      .on('mouseover', function (_, d) {
        d3.select(this).attr('fill', '#f97316');

        link
          .attr('stroke', (l) => {
            const src = typeof l.source === 'string' ? l.source : l.source.id;
            const tgt = typeof l.target === 'string' ? l.target : l.target.id;
            return src === d.id || tgt === d.id ? '#f97316' : '#cbd5e1';
          })
          .attr('stroke-opacity', (l) => {
            const src = typeof l.source === 'string' ? l.source : l.source.id;
            const tgt = typeof l.target === 'string' ? l.target : l.target.id;
            return src === d.id || tgt === d.id ? 1 : 0.25;
          });
      })
      .on('mousemove', (event, d) => {
        tooltip
          .style('opacity', '1')
          .style('left', `${event.clientX + 12}px`)
          .style('top', `${event.clientY + 12}px`)
          .text(`Node: ${d.id}`);
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#2563eb');
        tooltip.style('opacity', '0');
        link.attr('stroke', '#94a3b8').attr('stroke-opacity', 0.7);
      })
      .call(drag(simulation));

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as StrategyNode).x ?? 0)
        .attr('y1', (d) => (d.source as StrategyNode).y ?? 0)
        .attr('x2', (d) => (d.target as StrategyNode).x ?? 0)
        .attr('y2', (d) => (d.target as StrategyNode).y ?? 0);

      node.attr('cx', (d) => d.x ?? 0).attr('cy', (d) => d.y ?? 0);
      label.attr('x', (d) => d.x ?? 0).attr('y', (d) => d.y ?? 0);
    });

    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', maxWidth: '1000px', border: '1px solid #e2e8f0', borderRadius: 12, background: '#f8fafc' }}
    />
  );
}
