import CatsLoading from "@/components/ui/loading";

export default function ExplorarLoading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
      <div className="text-amber-500">
        <CatsLoading className="w-16 h-auto" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Carregando feed...
      </p>
    </div>
  );
}
