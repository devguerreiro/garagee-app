import Form from "./Form";

export default function Page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="container p-8 bg-card shadow rounded space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl text-secondary text-center font-bold uppercase">
            Garag_<strong className="text-primary">ee</strong>
          </h1>
          <p className="text-sm text-muted-foreground">
            Informe seu login para acessar a plataforma
          </p>
        </div>
        <hr />
        <Form />
      </div>
    </div>
  );
}
