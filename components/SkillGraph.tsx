'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { UserProfile } from '../lib/dataStore';

type SkillNode = d3.SimulationNodeDatum & {
  id: string;
  type: 'user' | 'skill';
};

type SkillLink = d3.SimulationLinkDatum<SkillNode> & {
  source: string | SkillNode;
  target: string | SkillNode;
  relation: 'HAVE' | 'WANT';
};

const width = 1000;
const height = 600;

type Props = {
  users: UserProfile[];
};

export default function SkillGraph({ users }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [keyword, setKeyword] = useState('');

  const filteredUsers = useMemo(() => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized) return users;

    return users.filter((u) => {
      const pool = [u.name, ...u.have, ...u.want].join(' ').toLowerCase();
      return pool.includes(normalized);
    });
  }, [users, keyword]);

  useEffect(() => {
    if (!svgRef.current) return;

    const skillSet = new Set<string>();
    filteredUsers.forEach((u) => {
      u.have.forEach((s) => skillSet.add(s));
      u.want.forEach((s) => skillSet.add(s));
    });

    const nodes: SkillNode[] = [
      ...filteredUsers.map((u) => ({ id: u.name, type: 'user' as const })),
      ...Array.from(skillSet).map((s) => ({ id: s, type: 'skill' as const }))
    ];

    const links: SkillLink[] = [];
    filteredUsers.forEach((u) => {
      u.have.forEach((skill) => links.push({ source: u.name, target: skill, relation: 'HAVE' }));
      u.want.forEach((skill) => links.push({ source: u.name, target: skill, relation: 'WANT' }));
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const zoomLayer = svg.append('g');
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'fixed')
      .style('padding', '6px 10px')
      .style('background', '#0f172a')
      .style('color', '#fff')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', '0');

    const link = zoomLayer
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => (d.relation === 'HAVE' ? '#2563eb' : '#f59e0b'))
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', 2);

    const node = zoomLayer
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => (d.type === 'user' ? 18 : 12))
      .attr('fill', (d) => (d.type === 'user' ? '#0ea5e9' : '#10b981'))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .style('cursor', 'grab');

    const label = zoomLayer
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d) => d.id)
      .attr('font-size', 11)
      .attr('dx', 14)
      .attr('dy', 4);

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(nodes, links).id((d) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-260))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const drag = d3
      .drag<SVGCircleElement, SkillNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node
      .on('mouseover', function (_, d) {
        d3.select(this).attr('fill', '#ef4444');
        link.attr('stroke-opacity', (l) => {
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;
          return sourceId === d.id || targetId === d.id ? 1 : 0.12;
        });
      })
      .on('mousemove', (event, d) => {
        tooltip
          .style('opacity', '1')
          .style('left', `${event.clientX + 10}px`)
          .style('top', `${event.clientY + 10}px`)
          .text(`${d.type.toUpperCase()}: ${d.id}`);
      })
      .on('mouseout', function (_, d) {
        d3.select(this).attr('fill', d.type === 'user' ? '#0ea5e9' : '#10b981');
        tooltip.style('opacity', '0');
        link.attr('stroke-opacity', 0.5);
      })
      .call(drag);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as SkillNode).x ?? 0)
        .attr('y1', (d) => (d.source as SkillNode).y ?? 0)
        .attr('x2', (d) => (d.target as SkillNode).x ?? 0)
        .attr('y2', (d) => (d.target as SkillNode).y ?? 0);

      node.attr('cx', (d) => d.x ?? 0).attr('cy', (d) => d.y ?? 0);
      label.attr('x', (d) => d.x ?? 0).attr('y', (d) => d.y ?? 0);
    });

    svg.call(
      d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.4, 3]).on('zoom', (event) => {
        zoomLayer.attr('transform', event.transform.toString());
      })
    );

    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [filteredUsers]);

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search user or skill"
        className="input"
        style={{ marginBottom: 12 }}
      />
      <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="graph" />
    </div>
  );
}
