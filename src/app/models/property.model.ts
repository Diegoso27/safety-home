interface Children {
    rut: string,
    name: string,
    age: number,
    bloodType: string,
    medicalHistory: string,
    medicalInsurance: string,
    allergies: string
  }
  
  export interface Property {
    id: number,
    direction: string,
    commune: string,
    city: string,
    region: string,
    // children: [Children],
    number: string
  }