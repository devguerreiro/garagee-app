import Image from "next/image";

import Form from "./Form";

export default function Page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="container p-8 bg-card shadow rounded-lg space-y-4 md:max-w-md">
        <div className="space-y-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={84}
            className="mx-auto"
          />
          <p className="text-sm text-center">
            Informe seu login para acessar a plataforma
          </p>
        </div>
        <hr />
        <Form />
      </div>
    </div>
  );
}
