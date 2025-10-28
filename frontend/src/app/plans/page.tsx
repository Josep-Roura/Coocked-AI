const plans = [
  { name: "Free", price: "0 €", audience: "Usuarios nuevos y curiosos" },
  { name: "Athlete", price: "9,99 €/mes", audience: "Deportistas regulares" },
  { name: "Pro Coach", price: "19,99 €/mes", audience: "Entrenadores o atletas avanzados" }
];

export default function PlansPage() {
  return (
    <section className="space-y-12 text-[#2B2B2B]">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4A90E2]">Planes</p>
        <h1 className="font-heading text-4xl text-[#111111]">Elige tu nivel, alcanza tus metas.</h1>
        <p className="mx-auto max-w-2xl text-lg text-[#2B2B2B]/80">
          Todos los planes incluyen IA personalizada, sincronización con tus apps y seguimiento nutricional en tiempo real.
        </p>
      </header>

      <div className="overflow-hidden rounded-[32px] border border-[#E5E5E5] bg-white shadow-xl">
        <table className="w-full table-auto text-left text-[#2B2B2B]">
          <thead className="bg-[#F5F5F5] text-sm uppercase tracking-[0.2em] text-[#8E8E8E]">
            <tr>
              <th className="px-6 py-4 font-medium">Plan</th>
              <th className="px-6 py-4 font-medium">Precio</th>
              <th className="px-6 py-4 font-medium">Ideal para</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr
                key={plan.name}
                className={`text-base ${index % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"}`}
              >
                <td className="px-6 py-6 font-heading text-lg text-[#111111]">{plan.name}</td>
                <td className="px-6 py-6 font-metric text-xl text-[#4A90E2]">{plan.price}</td>
                <td className="px-6 py-6 text-[#2B2B2B]/80">{plan.audience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
