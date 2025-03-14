import Form from "./Form";

export default function Page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="p-8 bg-card shadow rounded space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl text-center uppercase">
            Garag_<strong className="text-emerald-600">ee</strong>
          </h1>
          <p className="text-sm text-muted-foreground">
            Informe seu login para acessar a plataforma
          </p>
        </div>
        <Form />
      </div>
    </div>
  );
}
