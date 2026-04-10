"use client";

interface MatchScoreProps {
  score: number;
}

export default function MatchScore({ score }: MatchScoreProps) {
  let color = "text-red-600";
  let bg = "bg-red-100";
  let label = "Low Match";

  if (score >= 70) {
    color = "text-green-600";
    bg = "bg-green-100";
    label = "Excellent Match";
  } else if (score >= 50) {
    color = "text-emerald-600";
    bg = "bg-emerald-100";
    label = "Good Match";
  } else if (score >= 30) {
    color = "text-yellow-600";
    bg = "bg-yellow-100";
    label = "Fair Match";
  }

  return (
    <div className="text-center">
      <div className={`mx-auto mb-3 inline-flex h-24 w-24 items-center justify-center rounded-full ${bg}`}>
        <span className={`text-3xl font-extrabold ${color}`}>{score}%</span>
      </div>
      <p className={`text-lg font-semibold ${color}`}>{label}</p>
      <p className="mt-1 text-sm text-gray-500">
        Based on your employment, income, and credit profile
      </p>
    </div>
  );
}
