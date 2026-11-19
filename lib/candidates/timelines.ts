export type CareerEvent = {
  year: string;
  title: string;
  detail: string;
};

export const CAREER_TIMELINES: Record<string, CareerEvent[]> = {
  elena: [
    {
      year: "2006",
      title: "Administración pública",
      detail: "Concluye la licenciatura y entra a equipos de planeación de servicios municipales.",
    },
    {
      year: "2011",
      title: "Proyectos urbanos",
      detail: "Coordina obras de barrio, presupuesto participativo y mesas con vecinos.",
    },
    {
      year: "2016",
      title: "Participación ciudadana",
      detail: "Dirige programas para que las comunidades definan prioridades de inversión local.",
    },
    {
      year: "2020",
      title: "Servicios comunitarios",
      detail: "Moderniza trámites y la atención en ventanillas de los municipios donde trabaja.",
    },
    {
      year: "2023",
      title: "Agenda ambiental",
      detail: "Integra residuos, arbolado y cuencas a la planeación urbana de su gestión.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Alianza Horizonte una plataforma de servicios públicos y ambiente.",
    },
  ],
  mateo: [
    {
      year: "2010",
      title: "Economía",
      detail: "Se forma en economía y empieza a asesorar proyectos de desarrollo en su región.",
    },
    {
      year: "2014",
      title: "Pequeñas empresas",
      detail: "Acompaña a negocios locales en gestión, costos y acceso a mercados cercanos.",
    },
    {
      year: "2017",
      title: "Empleo juvenil",
      detail: "Arma programas que vinculan oficios, prácticas y el primer trabajo formal.",
    },
    {
      year: "2021",
      title: "Prevención comunitaria",
      detail: "Suma empleo y espacio público a estrategias de prevención en los barrios.",
    },
    {
      year: "2024",
      title: "Desarrollo local",
      detail: "Coordina una cartera de proyectos municipales con metas de empleo y empresa.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Movimiento Raíz una plataforma de economía local y empleo.",
    },
  ],
  lucia: [
    {
      year: "2004",
      title: "Derecho",
      detail: "Egresa de derecho y se especializa en políticas públicas y acceso a servicios.",
    },
    {
      year: "2009",
      title: "Política pública",
      detail: "Redacta normas y programas para acercar trámites y servicios a la ciudadanía.",
    },
    {
      year: "2014",
      title: "Transparencia",
      detail: "Impulsa publicación de contratos, presupuestos y tiempos de respuesta institucional.",
    },
    {
      year: "2018",
      title: "Innovación digital",
      detail: "Lleva expedientes y citas a canales digitales, con seguimiento público del trámite.",
    },
    {
      year: "2023",
      title: "Atención ciudadana",
      detail: "Fortalece ventanillas únicas y datos abiertos sobre la calidad de la atención.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Futuro Común una plataforma de transparencia y servicios digitales.",
    },
  ],
  andres: [
    {
      year: "1998",
      title: "Administración de cooperativas",
      detail: "Se forma en administración y entra a una cooperativa agrícola del altiplano.",
    },
    {
      year: "2004",
      title: "Compras comunitarias",
      detail: "Organiza compras conjuntas de insumos para que las familias paguen menos al sembrar.",
    },
    {
      year: "2010",
      title: "Riego",
      detail: "Coordina sistemas de riego en comunidades donde la cosecha dependía de la lluvia.",
    },
    {
      year: "2016",
      title: "Comercialización",
      detail: "Abre canales para vender la cosecha local sin perder el precio en los intermediarios.",
    },
    {
      year: "2022",
      title: "Red de cooperativas",
      detail: "Articula varias cooperativas para compartir transporte, acopio y asistencia técnica.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Pueblo Vivo una plataforma de campo, riego y mercados locales.",
    },
  ],
  sofia: [
    {
      year: "2012",
      title: "Periodismo",
      detail: "Estudia comunicación y cubre la vida municipal en el occidente del país.",
    },
    {
      year: "2015",
      title: "Medios comunitarios",
      detail: "Coordina radios y boletines locales para que los pueblos cuenten sus propias noticias.",
    },
    {
      year: "2018",
      title: "Lectura",
      detail: "Abre talleres de lectura y bibliotecas de barrio en municipios con poca oferta cultural.",
    },
    {
      year: "2021",
      title: "Juventud y cultura",
      detail: "Arma ciclos de arte y oficio para que jóvenes produzcan desde su propio municipio.",
    },
    {
      year: "2024",
      title: "Red cultural",
      detail: "Enlaza medios comunitarios y casas de la cultura en una agenda compartida.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Vía Cívica una plataforma de cultura, lectura y comunicación local.",
    },
  ],
  diego: [
    {
      year: "2002",
      title: "Ingeniería civil",
      detail: "Egresa y entra a cuadrillas de obra en caminos y agua del oriente.",
    },
    {
      year: "2007",
      title: "Caminos rurales",
      detail: "Supervisa rehabilitación de tramos que conectan aldeas con la cabecera municipal.",
    },
    {
      year: "2012",
      title: "Agua potable",
      detail: "Dirige proyectos de captación y distribución de agua en comunidades sin servicio.",
    },
    {
      year: "2017",
      title: "Mantenimiento",
      detail: "Deja planes de mantenimiento para que la obra no se abandone al terminar el contrato.",
    },
    {
      year: "2023",
      title: "Obra municipal",
      detail: "Coordina un paquete de caminos y sistemas de agua con metas públicas de avance.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Frente del Valle una plataforma de infraestructura rural y agua.",
    },
  ],
  camila: [
    {
      year: "2016",
      title: "Medicina",
      detail: "Egresa de medicina y elige la atención primaria en la costa sur.",
    },
    {
      year: "2018",
      title: "Puesto de salud",
      detail: "Atiende en un puesto de salud y organiza la jornada con promotores de la comunidad.",
    },
    {
      year: "2020",
      title: "Vacunación",
      detail: "Coordina campañas de vacunación casa por casa en aldeas de difícil acceso.",
    },
    {
      year: "2022",
      title: "Prevención",
      detail: "Suma control prenatal, nutrición y enfermedades crónicas a la consulta diaria.",
    },
    {
      year: "2025",
      title: "Primer nivel",
      detail: "Acompaña a varios puestos para compartir insumos, referencias y horarios de atención.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Renacer Nacional una plataforma de salud comunitaria y prevención.",
    },
  ],
  javier: [
    {
      year: "1991",
      title: "Agronomía",
      detail: "Se forma como agrónomo y empieza a asesorar parcelas familiares.",
    },
    {
      year: "1998",
      title: "Asistencia técnica",
      detail: "Recorre comunidades para mejorar semilla, suelo y el calendario de siembra.",
    },
    {
      year: "2006",
      title: "Asociaciones de productores",
      detail: "Ayuda a constituir asociaciones para comprar insumos y vender en conjunto.",
    },
    {
      year: "2013",
      title: "Precio de cosecha",
      detail: "Negocia acuerdos de precio para que la cosecha no se malvenda en la temporada alta.",
    },
    {
      year: "2021",
      title: "Mercados locales",
      detail: "Abre puntos de venta directa entre productores y compradores del municipio.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Unión del Campo una plataforma de producción agrícola y mercados.",
    },
  ],
  valeria: [
    {
      year: "2009",
      title: "Arquitectura",
      detail: "Estudia arquitectura y se concentra en transporte y espacio público.",
    },
    {
      year: "2013",
      title: "Movilidad",
      detail: "Participa en planes para ordenar rutas, paradas y el cruce seguro de las calles.",
    },
    {
      year: "2016",
      title: "Espacio público",
      detail: "Diseña parques y aceras que devuelven la banqueta a quien camina.",
    },
    {
      year: "2020",
      title: "Barrios",
      detail: "Trabaja planes de barrio con vecinos, comercio y el transporte que ya existe.",
    },
    {
      year: "2024",
      title: "Red urbana",
      detail: "Coordina proyectos de movilidad entre varios municipios de una misma ciudad.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Ciudad Abierta una plataforma de movilidad y espacio público.",
    },
  ],
  ricardo: [
    {
      year: "2000",
      title: "Derecho laboral",
      detail: "Egresa de derecho y se dedica a conflictos entre trabajadores y empleadores.",
    },
    {
      year: "2005",
      title: "Negociación colectiva",
      detail: "Acompaña mesas para pactar salarios, jornadas y condiciones de trabajo.",
    },
    {
      year: "2011",
      title: "Formalización",
      detail: "Arma programas para que el empleo informal pase a un contrato y a la seguridad social.",
    },
    {
      year: "2016",
      title: "Diálogo sindical",
      detail: "Sostiene mesas permanentes entre sindicatos, empresas y autoridades locales.",
    },
    {
      year: "2022",
      title: "Empleo formal",
      detail: "Mide cuántos acuerdos terminan en contrato y da seguimiento a los que se caen.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Alianza del Sur una plataforma de trabajo formal y diálogo laboral.",
    },
  ],
  natalia: [
    {
      year: "2005",
      title: "Ingeniería en sistemas",
      detail: "Estudia sistemas y entra a equipos que conectan oficinas municipales.",
    },
    {
      year: "2010",
      title: "Conectividad",
      detail: "Dirige enlaces de internet para escuelas y puestos de salud en zonas rurales.",
    },
    {
      year: "2015",
      title: "Trámites digitales",
      detail: "Pasa citas, constancias y pagos simples a un canal digital del municipio.",
    },
    {
      year: "2019",
      title: "Servicios municipales",
      detail: "Unifica expedientes para que la persona no repita papeles en cada ventanilla.",
    },
    {
      year: "2023",
      title: "Red de municipios",
      detail: "Comparte la misma plataforma entre varios gobiernos locales con poca plantilla técnica.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Movimiento Abierto una plataforma de conectividad y trámites digitales.",
    },
  ],
  oscar: [
    {
      year: "1994",
      title: "Economía pública",
      detail: "Se forma en economía y entra a oficinas de presupuesto municipal.",
    },
    {
      year: "2001",
      title: "Presupuesto",
      detail: "Arma presupuestos que separan obra, salarios y los servicios de todos los días.",
    },
    {
      year: "2008",
      title: "Gasto público",
      detail: "Revisa en qué se usa el dinero y publica desvíos entre lo aprobado y lo gastado.",
    },
    {
      year: "2014",
      title: "Fiscalización",
      detail: "Coordina auditorías de obra y de compras para cerrar contratos opacos.",
    },
    {
      year: "2021",
      title: "Cuentas públicas",
      detail: "Deja informes anuales que cualquier persona puede leer sin un contador al lado.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Centro Democrático una plataforma de presupuesto y control del gasto.",
    },
  ],
  mariana: [
    {
      year: "2010",
      title: "Trabajo social",
      detail: "Estudia trabajo social y empieza en programas de apoyo a familias.",
    },
    {
      year: "2014",
      title: "Redes de cuidado",
      detail: "Organiza redes de vecinas para cuidar a la niñez mientras las madres trabajan.",
    },
    {
      year: "2017",
      title: "Alimentación escolar",
      detail: "Coordina comedores y refacción escolar en escuelas con alta deserción.",
    },
    {
      year: "2021",
      title: "Apoyo familiar",
      detail: "Acompaña hogares en crisis con orientación, gestión de ayudas y seguimiento.",
    },
    {
      year: "2024",
      title: "Cuidado comunitario",
      detail: "Enlaza escuelas, centros de salud y redes de cuidado en un mismo circuito.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Voces Unidas una plataforma de cuidado, niñez y apoyo a las familias.",
    },
  ],
  hugo: [
    {
      year: "1987",
      title: "Aula rural",
      detail: "Empieza como maestro de primaria en una escuela de aldea.",
    },
    {
      year: "1996",
      title: "Dirección escolar",
      detail: "Asume la dirección y ordena horarios, materiales y la relación con las familias.",
    },
    {
      year: "2005",
      title: "Varias escuelas",
      detail: "Acompaña a otros directores rurales para compartir lo que ya funcionaba en el aula.",
    },
    {
      year: "2013",
      title: "Formación docente",
      detail: "Abre talleres para maestros que dan clase en grados combinados y con pocos libros.",
    },
    {
      year: "2020",
      title: "Red de maestros",
      detail: "Deja una red de docentes que se visitan y preparan la clase en conjunto.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Compromiso Local una plataforma de escuela rural y formación de maestros.",
    },
  ],
  patricia: [
    {
      year: "2003",
      title: "Relaciones internacionales",
      detail: "Estudia relaciones internacionales y entra a equipos de comercio regional.",
    },
    {
      year: "2008",
      title: "Comercio",
      detail: "Trabaja acuerdos para que productos locales crucen frontera con menos trámites.",
    },
    {
      year: "2013",
      title: "Integración regional",
      detail: "Participa en mesas con países vecinos sobre aduanas, transporte y normas sanitarias.",
    },
    {
      year: "2018",
      title: "Cooperación",
      detail: "Coordina proyectos compartidos de infraestructura y formación con socios de la región.",
    },
    {
      year: "2023",
      title: "Agenda exterior",
      detail: "Ordena una cartera de cooperación atada a empleo, comercio y obras concretas.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con República Nueva una plataforma de comercio e integración regional.",
    },
  ],
  fernando: [
    {
      year: "2008",
      title: "Lingüística",
      detail: "Estudia lingüística y se concentra en los idiomas mayas que se hablan en el aula.",
    },
    {
      year: "2012",
      title: "Docencia bilingüe",
      detail: "Da clases en un programa bilingüe y prepara la lección en el idioma de la comunidad.",
    },
    {
      year: "2016",
      title: "Materiales escolares",
      detail: "Produce cuadernos y lecturas en idiomas mayas para los primeros grados.",
    },
    {
      year: "2020",
      title: "Formación de docentes",
      detail: "Capacita a maestros bilingües para usar esos materiales sin traducirlos al final.",
    },
    {
      year: "2024",
      title: "Red de aulas",
      detail: "Enlaza escuelas bilingües para compartir textos, audios y la formación del ciclo.",
    },
    {
      year: "2027",
      title: "Candidatura presidencial",
      detail: "Postula con Semilla Cívica una plataforma de educación bilingüe e idiomas mayas.",
    },
  ],
};
