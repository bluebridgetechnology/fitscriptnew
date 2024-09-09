"use client"
export default function CircleRating({ value, onChange, totalCircle, firstLabel, lastLabel }) {
  return (
    <div className="table-responsive">
      <ul className="pain-scale">
        {Array(totalCircle).fill(null).map((_, index) => (
          <li key={index}><span className={value == (index + 1) ? 'circle filled' : 'circle'} onClick={() => onChange(index + 1)}>{index + 1}</span>{index == 0 ? firstLabel : ''}{(index + 1) == totalCircle ? lastLabel : ''}</li>
        ))}
      </ul>
    </div>
  );
}