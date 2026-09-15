import { defineProcedures } from '../schema.js';

export default defineProcedures('neurologic', [
  {
    id: 'lumbar-puncture',
    name: 'Lumbar Puncture',
    aka: ['LP', 'spinal tap', 'CSF sampling'],
    acuity: 'urgent',
    frequency: 'frequent',
    summary:
      'Needle sampling of cerebrospinal fluid from the lumbar cistern for diagnosis or pressure measurement.',
    video: {
      id: 'CKLpIDhuJrE',
      title: 'Lumbar Puncture - Step By Step Procedure (NEJM)',
    },
    equipment: [
      { item: 'Spinal needle', detail: '22 G atraumatic (pencil-point) preferred; 20-22 G cutting if measuring pressure' },
      { item: 'Manometer with three-way tap' },
      { item: 'Four numbered collection tubes', detail: 'Plus a fluoride tube for glucose' },
      { item: 'Lidocaine 1%, 25 G and 23 G needles' },
      { item: 'Sterile gown, gloves, drape, chlorhexidine' },
      { item: 'Ultrasound', detail: 'For landmarking in obese patients', optional: true },
      { item: 'Dressing' },
    ],
    indications: [
      'Suspected meningitis or encephalitis',
      'Suspected subarachnoid haemorrhage with a negative CT beyond 6 hours of onset',
      'Suspected idiopathic intracranial hypertension (measure the opening pressure)',
      'Suspected Guillain-Barre syndrome or other inflammatory neuropathy',
      'Therapeutic CSF removal in idiopathic intracranial hypertension',
    ],
    contraindications: {
      absolute: [
        'Signs of raised intracranial pressure with mass effect — image first',
        'Infection over the puncture site',
        'Suspected spinal epidural abscess at that level',
      ],
      relative: [
        'Coagulopathy, platelets below 50, or therapeutic anticoagulation',
        'Haemodynamic instability — resuscitate and give antibiotics first',
        'Known spinal hardware or severe degenerative disease at the target level',
      ],
    },
    steps: [
      { text: 'Administer antibiotics before the procedure where bacterial meningitis is suspected.', caution: 'Antibiotics precede the lumbar puncture. Culture yield may fall; mortality from delayed treatment does not.' },
      { text: 'Obtain cranial imaging first in the presence of papilloedema, focal neurological deficit, new-onset seizure, immunosuppression or reduced conscious level.' },
      { text: 'Position in the lateral decubitus position with the knees flexed to the chest at the edge of the bed, shoulders and hips perpendicular to the mattress. The seated position is technically easier but does not give a valid opening pressure.' },
      { text: 'Identify the L3-L4 or L4-L5 interspace along the intercristal line joining the iliac crests, and mark it.' },
      { text: 'Prepare and drape under aseptic technique, then infiltrate skin and deeper tissues with lidocaine and allow time for effect.' },
      { text: 'Insert the spinal needle in the midline with the bevel parallel to the long axis of the spine, angled approximately 15 degrees cephalad towards the umbilicus.' },
      { text: 'Advance slowly, withdrawing the stylet every few millimetres to check for flow. A change in resistance is felt at the ligamentum flavum and again on dural puncture.' },
      { text: 'On return of cerebrospinal fluid, attach the manometer and record the opening pressure with the legs extended.' },
      { text: 'Collect 10-15 drops into each of the four sequentially numbered tubes, replace the stylet, and withdraw the needle in a single movement.' },
      { text: 'Apply a dressing. Send cell count and differential on tubes 1 and 4, protein, glucose, Gram stain and culture, with a paired serum glucose.' },
    ],
    pearls: [
      'Bone at a shallow depth means you are off midline more often than too caudal. Withdraw to subcutaneous tissue and re-angle rather than fanning deep.',
      'Atraumatic needles roughly halve the rate of post-dural puncture headache.',
      'A falling red cell count from tube 1 to tube 4 suggests a traumatic tap; xanthochromia suggests subarachnoid blood.',
    ],
    complications: [
      'Post-dural puncture headache',
      'Traumatic tap',
      'Backache',
      'Epidural haematoma (rare, higher with coagulopathy)',
      'Cerebral herniation if raised pressure with mass effect was missed',
      'Infection',
    ],
  },
]);
