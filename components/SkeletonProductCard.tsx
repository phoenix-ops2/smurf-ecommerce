const SkeletonProductCard = () => {
  return (
    <div className="border rounded-lg shadow bg-white dark:bg-zinc-900 p-4 space-y-4">
      <div className="h-48 w-full rounded shimmer" />
      <div className="h-4 w-3/4 rounded shimmer" />
      <div className="h-4 w-1/2 rounded shimmer" />
      <div className="h-10 w-full rounded shimmer" />
    </div>
  );
};

export default SkeletonProductCard;
