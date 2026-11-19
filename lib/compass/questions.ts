export type CompassOption = {
  id: string;
  label: string;
  economic: number;
  authority: number;
};

export type CompassQuestion = {
  id: string;
  theme: string;
  prompt: string;
  options: CompassOption[];
};

export const COMPASS_THEMES = [
  "Economía",
  "Estado y gobierno",
  "Derechos y libertades",
  "Sociedad y cultura",
  "Ambiente",
  "Política exterior",
] as const;

function options(
  a: [string, number, number],
  b: [string, number, number],
  c: [string, number, number],
  d: [string, number, number],
): CompassOption[] {
  return [a, b, c, d].map(([label, economic, authority], index) => ({
    id: ["a", "b", "c", "d"][index] ?? "a",
    label,
    economic,
    authority,
  }));
}

export const COMPASS_QUESTIONS: CompassQuestion[] = [
  {
    id: "economia-1",
    theme: "Economía",
    prompt: "El papel del Estado en la economía debería ser principalmente:",
    options: options(
      ["Regular para garantizar competencia justa y proteger a los consumidores.", -1, 1],
      ["Intervenir activamente para corregir desigualdades y asegurar bienestar.", -2, 1],
      ["Mantenerse al margen y dejar que el mercado funcione libremente.", 2, -1],
      ["Reducir el sector público al mínimo indispensable.", 2, -2],
    ),
  },
  {
    id: "economia-2",
    theme: "Economía",
    prompt: "Ante un alza fuerte de precios de la canasta básica, ¿qué debería priorizar el país?",
    options: options(
      ["Topes de precios y controles para proteger a las familias.", -2, 2],
      ["Apoyos temporales a hogares, sin fijar todos los precios.", -1, 0],
      ["Bajar impuestos y trámites para que haya más oferta.", 1, -1],
      ["No intervenir: los precios se ajustan solos.", 2, -2],
    ),
  },
  {
    id: "economia-3",
    theme: "Economía",
    prompt: "Los impuestos deberían servir sobre todo para:",
    options: options(
      ["Financiar servicios públicos y redistribuir hacia quien menos tiene.", -2, 1],
      ["Cubrir lo básico del Estado y dejar más ingreso en las familias.", 1, -1],
      ["Ser bajos y parejos, con pocas excepciones.", 2, 0],
      ["Casi desaparecer: cada persona decide en qué gastar.", 2, -2],
    ),
  },
  {
    id: "economia-4",
    theme: "Economía",
    prompt: "Un negocio nuevo en el barrio debería enfrentar:",
    options: options(
      ["Reglas estrictas de empleo, precios y permisos antes de abrir.", -1, 2],
      ["Requisitos claros de seguridad e higiene, y apoyo para formalizarse.", -1, 0],
      ["Pocos trámites y libertad para pactar salarios y horarios.", 2, -1],
      ["Ningún permiso: quien quiera emprender, emprende.", 2, -2],
    ),
  },
  {
    id: "estado-1",
    theme: "Estado y gobierno",
    prompt: "Cuando hay un problema grave de seguridad, el gobierno debería:",
    options: options(
      ["Ampliar facultades de la policía y limitar garantías mientras dure la crisis.", 0, 2],
      ["Reforzar la investigación y los juzgados, sin suspender derechos.", 0, 0],
      ["Priorizar prevención comunitaria y reducir el uso de la fuerza.", -1, -1],
      ["Dejar la protección en manos de las comunidades, con poco Estado.", 1, -2],
    ),
  },
  {
    id: "estado-2",
    theme: "Estado y gobierno",
    prompt: "Las decisiones importantes del país deberían tomarlas:",
    options: options(
      ["Expertos y autoridades, aunque la consulta pública tarde.", 0, 2],
      ["El Congreso, con información clara para la ciudadanía.", 0, 0],
      ["La gente, mediante consultas frecuentes, y el Estado ejecuta.", -1, -1],
      ["Cada comunidad, con la menor intervención del gobierno central.", 1, -2],
    ),
  },
  {
    id: "estado-3",
    theme: "Estado y gobierno",
    prompt: "Un funcionario que no publica cómo gasta el presupuesto:",
    options: options(
      ["Debería poder reservar datos si así se agiliza la obra pública.", 0, 2],
      ["Debería explicar lo esencial, sin abrir cada documento.", 0, 1],
      ["Debería publicar contratos y gastos para que cualquiera los revise.", 0, -1],
      ["Debería perder el cargo si oculta información de interés público.", 0, -2],
    ),
  },
  {
    id: "estado-4",
    theme: "Estado y gobierno",
    prompt: "Para mejorar los servicios del Estado, confiaría más en:",
    options: options(
      ["Un plan nacional único, igual para todo el país.", -1, 2],
      ["Metas públicas y evaluación, con espacio para adaptarlas.", -1, 0],
      ["Municipios y organizaciones locales que conocen el territorio.", 0, -1],
      ["Que las personas contraten servicios por su cuenta.", 2, -2],
    ),
  },
  {
    id: "derechos-1",
    theme: "Derechos y libertades",
    prompt: "Una opinión incómoda en redes, que no llama a la violencia, debería:",
    options: options(
      ["Retirarse si una autoridad considera que daña la convivencia.", 0, 2],
      ["Señalizarse, pero seguir visible.", 0, 1],
      ["Quedarse: la respuesta es más debate, no censura.", 0, -1],
      ["Protegerse siempre, aunque moleste a la mayoría.", 0, -2],
    ),
  },
  {
    id: "derechos-2",
    theme: "Derechos y libertades",
    prompt: "Sobre decisiones personales de vida, el Estado debería:",
    options: options(
      ["Definir lo correcto y desalentar lo que se aparte de esa norma.", 0, 2],
      ["Orientar con campañas, sin prohibir la mayoría de elecciones.", 0, 1],
      ["Garantizar derechos iguales y dejar la decisión a cada persona.", 0, -1],
      ["No opinar: la vida privada no le corresponde.", 1, -2],
    ),
  },
  {
    id: "derechos-3",
    theme: "Derechos y libertades",
    prompt: "Protestar en la calle, sin violencia, debería:",
    options: options(
      ["Exigir permiso previo y rutas autorizadas, o no realizarse.", 0, 2],
      ["Avisarse para cuidar el tránsito, con reglas claras.", 0, 1],
      ["Permitirse con pocos requisitos, porque es una forma de participar.", 0, -1],
      ["No necesitar autorización del gobierno.", 0, -2],
    ),
  },
  {
    id: "derechos-4",
    theme: "Derechos y libertades",
    prompt: "Si una ley choca con la forma de vida de una comunidad, yo priorizaría:",
    options: options(
      ["La ley nacional, igual para todas las personas.", 0, 2],
      ["La ley, con excepciones muy justificadas.", 0, 1],
      ["Un acuerdo que respete derechos individuales y la práctica local.", 0, -1],
      ["La autonomía de la comunidad por encima de la norma general.", 0, -2],
    ),
  },
  {
    id: "sociedad-1",
    theme: "Sociedad y cultura",
    prompt: "La escuela pública debería enseñar sobre ideas políticas:",
    options: options(
      ["Una visión oficial de civismo, para evitar confusión.", 0, 2],
      ["Los deberes ciudadanos y el funcionamiento del Estado.", 0, 1],
      ["Varias corrientes, con fuentes, para que cada estudiante compare.", 0, -1],
      ["Lo mínimo: la familia y la comunidad educan en valores.", 1, -2],
    ),
  },
  {
    id: "sociedad-2",
    theme: "Sociedad y cultura",
    prompt: "El arte y los medios que critican al gobierno deberían:",
    options: options(
      ["Revisarse si pueden alterar el orden público.", 0, 2],
      ["Circular, con advertencias cuando el contenido es fuerte.", 0, 1],
      ["Publicarse sin filtro oficial.", 0, -1],
      ["Recibir apoyo público precisamente por cuestionar al poder.", -1, -2],
    ),
  },
  {
    id: "sociedad-3",
    theme: "Sociedad y cultura",
    prompt: "Para incluir a más jóvenes en la vida pública, ayudaría más:",
    options: options(
      ["Un programa nacional obligatorio de servicio cívico.", -1, 2],
      ["Espacios voluntarios en escuelas e institutos, con información clara.", -1, 0],
      ["Clubes y medios hechos por jóvenes, sin tutoría del Estado.", 0, -1],
      ["Nada institucional: quien quiera participar, busca cómo.", 1, -2],
    ),
  },
  {
    id: "sociedad-4",
    theme: "Sociedad y cultura",
    prompt: "Las tradiciones y las nuevas formas de vivir en la ciudad:",
    options: options(
      ["Las tradiciones deberían prevalecer cuando hay conflicto.", 0, 2],
      ["Pueden convivir si nadie impone su costumbre a otras personas.", 0, 0],
      ["Las personas deberían poder apartarse de una tradición sin castigo social.", 0, -1],
      ["Ninguna costumbre merece protección especial del Estado.", 1, -2],
    ),
  },
  {
    id: "ambiente-1",
    theme: "Ambiente",
    prompt: "Un proyecto que genera empleo y también daña un río debería:",
    options: options(
      ["Aprobarse si el gobierno decide que el empleo pesa más.", 1, 2],
      ["Pararse hasta que haya un estudio público y condiciones estrictas.", -1, 1],
      ["Rechazarse si la comunidad afectada no está de acuerdo.", -1, -1],
      ["Decidirlo solo quien invierte, compensando por su cuenta.", 2, -2],
    ),
  },
  {
    id: "ambiente-2",
    theme: "Ambiente",
    prompt: "El cuidado de bosques y agua debería financiarse sobre todo con:",
    options: options(
      ["Impuestos y un plan estatal de conservación.", -2, 1],
      ["Reglas claras y fondos mixtos, públicos y de quienes usan el recurso.", -1, 0],
      ["Acuerdos locales y pagos de quien contamina.", 1, -1],
      ["La decisión de cada propietario de su terreno.", 2, -2],
    ),
  },
  {
    id: "ambiente-3",
    theme: "Ambiente",
    prompt: "Ante la basura en una ciudad, la medida más útil sería:",
    options: options(
      ["Multas altas y vigilancia constante.", 0, 2],
      ["Recolección pública gratuita y separación obligatoria.", -1, 1],
      ["Incentivos para reciclar y menos prohibiciones.", 1, -1],
      ["Que cada hogar pague solo el servicio que contrate.", 2, -2],
    ),
  },
  {
    id: "ambiente-4",
    theme: "Ambiente",
    prompt: "La información sobre contaminación de una fábrica debería:",
    options: options(
      ["Reservarse al ministerio, para no alarmar.", 0, 2],
      ["Publicarse en resumen, después de una revisión oficial.", 0, 1],
      ["Estar abierta para vecinas, prensa y universidades.", 0, -1],
      ["Exigirse en tiempo real, sin filtro del gobierno.", -1, -2],
    ),
  },
  {
    id: "exterior-1",
    theme: "Política exterior",
    prompt: "Frente a un tratado comercial, el país debería:",
    options: options(
      ["Negociarlo el Ejecutivo y aprobarlo con poca discusión pública.", 1, 2],
      ["Abrir los capítulos y debatirlos en el Congreso antes de firmar.", 0, 0],
      ["Rechazarlo si debilita reglas laborales o ambientales locales.", -2, -1],
      ["Firmarlo rápido para competir, aunque quite protecciones.", 2, 1],
    ),
  },
  {
    id: "exterior-2",
    theme: "Política exterior",
    prompt: "La ayuda de otros países para proyectos locales debería:",
    options: options(
      ["Aceptarse solo si el gobierno define todas las condiciones.", 0, 2],
      ["Aceptarse con metas públicas y rendición de cuentas.", -1, 0],
      ["Decidirse con las comunidades que van a recibirla.", -1, -1],
      ["Evitarse: cada país debe resolver sus asuntos solo.", 1, 0],
    ),
  },
  {
    id: "exterior-3",
    theme: "Política exterior",
    prompt: "Cuando otro país critica la situación de derechos aquí, yo esperaría:",
    options: options(
      ["Rechazar la crítica: los asuntos internos no se discuten afuera.", 0, 2],
      ["Escucharla en privado, sin convertirla en debate público.", 0, 1],
      ["Responder con datos y abrir la conversación.", 0, -1],
      ["Usarla como presión útil para cambiar leyes locales.", -1, -2],
    ),
  },
  {
    id: "exterior-4",
    theme: "Política exterior",
    prompt: "Las personas que migran deberían encontrar, en la política del país:",
    options: options(
      ["Controles estrictos y prioridad absoluta a quien ya vive aquí.", 1, 2],
      ["Reglas claras de ingreso y derechos básicos desde el primer día.", 0, 0],
      ["Vías amplias de regularización y acceso a trabajo.", -1, -1],
      ["Fronteras abiertas y los mismos servicios que cualquier residente.", -2, -2],
    ),
  },
];

export function questionAt(index: number) {
  return COMPASS_QUESTIONS[index] ?? null;
}

const optionKeys = ["a", "b", "c", "d"] as const;

export function compassSeedRows(): string[][] {
  return COMPASS_QUESTIONS.map((question, index) => {
    const row = [question.id, question.theme, question.prompt, String(index + 1), "true"];
    for (const key of optionKeys) {
      const option = question.options.find((item) => item.id === key);
      row.push(option?.label ?? "", String(option?.economic ?? 0), String(option?.authority ?? 0));
    }
    return row;
  });
}

export function optionById(question: CompassQuestion, optionId: string | undefined) {
  return question.options.find((option) => option.id === optionId) ?? null;
}
