const API = "http://localhost:3000/materiales";
const API2 = "http://localhost:3000/trabajosrealizados";
const API3 = "http://localhost:3000/materialestrabajosrealizados";


//-----------------materiales----------------
export const getMateriales = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const getMaterial = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return await res.json();
};

export const saveMateriales = async (idOrden,
  nombreM,
  espesor,
  color,
  descripcionM,
  medidaLargo,
  medidaAncho,
  precioLargo,
  precioM2,
  precioTotal,) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(idOrden,
      nombreM,
      espesor,
      color,
      descripcionM,
      medidaLargo,
      medidaAncho,
      precioLargo,
      precioM2,
      precioTotal,),
  });
  return await res.json();
};

export const EliminarMaterial = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

export const UpdateMaterial = async (id, newMaterial) => {
 const res =  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newMaterial),
  });
  return res;
};
//------------------------trabajos realizados------------------------

export const getTrabajosRealizados = async () => {
  const res = await fetch(API2);
  return await res.json();
};

export const getTrabajoRealizado = async (id) => {
  const res = await fetch(`${API2}/${id}`);
  return await res.json();
};

export const saveTrabajosRealizados = async (nuevoTrabajo) => {
  const res = await fetch(API2, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(nuevoTrabajo),
  });
  return await res.json();
};

export const EliminarTrabajoRealizado = async (id) => {
  await fetch(`${API2}/${id}`, {
    method: "DELETE",
  });
};

export const UpdateTrabajoRealizado = async (id, newTrabajo) => {
 const res =  await fetch(`${API2}/${id}`, {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newTrabajo),
  });
  return res;
};

//-----------------------materiales trabajos realizados --------------------
export const getMaterialesTrabajosRealizados = async () => {
  const res = await fetch(API3);
  return await res.json();
};

export const getMaterialTrabajosRealizados = async (id) => {
  const res = await fetch(`${API3}/${id}`);
  return await res.json();
};

export const saveMaterialTrabajosRealizados = async (nuevomaterial) => {
  const res = await fetch(API3, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(nuevomaterial),
  });
  console.log(nuevomaterial);
  return await res.json();
};

export const EliminarMaterialTrabajosRealizados = async (id) => {
  await fetch(`${API3}/${id}`, {
    method: "DELETE",
  });
};

export const UpdateMaterialTrabajosRealizados = async (id, newMaterial) => {
  const res =  await fetch(`${API3}/${id}`, {
     method: "PUT",
     headers: { Accept: "application/json", "Content-Type": "application/json" },
     body: JSON.stringify(newMaterial),
   });
   return res;
 };

