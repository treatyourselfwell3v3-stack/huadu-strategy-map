type SkillCardProps = {
  skill: string;
  tone?: 'have' | 'want';
};

export default function SkillCard({ skill, tone = 'have' }: SkillCardProps) {
  return <span className={`skill-tag ${tone}`}>{skill}</span>;
}
