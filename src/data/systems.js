/**
 * Organ-system categories. Order here is the order shown on the home screen.
 * `id` must match the folder-level module that supplies that system's
 * procedures (see ./index.js).
 */

export const SYSTEMS = [
  {
    id: 'airway',
    name: 'Airway & Respiratory',
    blurb: 'Securing, rescuing and ventilating the airway.',
    icon: 'lungs',
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular',
    blurb: 'Perfusion, rhythm and the pericardium.',
    icon: 'heart',
  },
  {
    id: 'vascular-access',
    name: 'Vascular Access',
    blurb: 'Getting a line in, by any route that works.',
    icon: 'drop',
  },
  {
    id: 'thoracic',
    name: 'Thoracic',
    blurb: 'The pleural space and chest wall.',
    icon: 'ribs',
  },
  {
    id: 'neurologic',
    name: 'Neurologic',
    blurb: 'CSF sampling and pressure management.',
    icon: 'brain',
  },
  {
    id: 'abdominal',
    name: 'Abdominal & GI',
    blurb: 'Peritoneal and gastrointestinal access.',
    icon: 'abdomen',
  },
  {
    id: 'genitourinary',
    name: 'Genitourinary',
    blurb: 'Bladder, urethra and genital emergencies.',
    icon: 'kidney',
  },
  {
    id: 'musculoskeletal',
    name: 'Musculoskeletal',
    blurb: 'Joints, compartments and reductions.',
    icon: 'bone',
  },
  {
    id: 'heent',
    name: 'Head, Eye, ENT & Dental',
    blurb: 'Sight-threatening and airway-adjacent ENT work.',
    icon: 'eye',
  },
  {
    id: 'soft-tissue',
    name: 'Skin & Soft Tissue',
    blurb: 'Wounds, abscesses and closure.',
    icon: 'suture',
  },
  {
    id: 'analgesia',
    name: 'Analgesia & Sedation',
    blurb: 'Regional blocks and procedural sedation.',
    icon: 'syringe',
  },
];

export const systemById = new Map(SYSTEMS.map((system) => [system.id, system]));
