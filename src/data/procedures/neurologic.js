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
      { text: 'Give antibiotics first if meningitis is suspected. Never delay them for the tap.', caution: 'Antibiotics before the LP. The Gram stain may suffer; the patient will not.' },
      { text: 'Image the head first if there is papilloedema, focal deficit, new seizure, immunosuppression, or reduced consciousness.' },
      { text: 'Position: lateral decubitus with knees to chest and the back at the very edge of the bed, shoulders and hips square. Sitting is easier to hit but cannot give a true opening pressure.' },
      { text: 'Find the L3-L4 or L4-L5 space along the intercristal line between the iliac crests. Mark it with a pen or your thumbnail.' },
      { text: 'Sterile prep and drape. Infiltrate skin and deeper tissues with lidocaine and give it time to work.' },
      { text: 'Insert the spinal needle in the midline, bevel parallel to the long axis of the spine, angled about 15 degrees cephalad towards the umbilicus.' },
      { text: 'Advance slowly, withdrawing the stylet every few millimetres to check for flow. Expect a subtle give at the ligamentum flavum and then the dura.' },
      { text: 'When CSF appears, attach the manometer and record the opening pressure with the legs straightened.' },
      { text: 'Collect 10-15 drops into each of the four numbered tubes, replace the stylet, and withdraw the needle in one movement.' },
      { text: 'Apply a dressing. Send cell count and differential on tubes 1 and 4, protein, glucose, Gram stain, culture, and paired serum glucose.' },
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
