const LoadingSpinner = ({ size = 8, borderWidth = 2 }) => (
  <div
    className={`animate-spin rounded-full h-${size} w-${size} border-b-${borderWidth} border-primary`}
  />
);

export default LoadingSpinner;