import AppLoading from "@/components/Loading";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-10 bg-black/50">
      <AppLoading />
    </div>
  );
}
