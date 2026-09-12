import { defineProcedures } from '../schema.js';

export default defineProcedures('thoracic', [
  {
    id: 'needle-decompression',
    name: 'Needle Thoracostomy',
    aka: ['needle decompression', 'tension pneumothorax decompression'],
    acuity: 'emergent',
    frequency: 'halo',
    summary:
      'Immediate needle release of a tension pneumothorax, buying minutes until a chest drain goes in.',
    video: {
      id: 'YzVXGvcL8PQ',
      title: 'Needle Thoracostomy; Needle Chest Decompression for Tension Pneumothorax',
    },
    equipment: [
      { item: 'Large-bore cannula', detail: '14 G, at least 8 cm long — a standard 4.5 cm cannula reaches the pleura in under half of adults' },
      { item: 'Chlorhexidine swab' },
      { item: '10 mL syringe', detail: 'Attached to the needle so you can aspirate', optional: true },
      { item: 'Tape to secure the cannula' },
      { item: 'Chest drain set', detail: 'Must follow immediately — this is not definitive treatment' },
    ],
    indications: [
      'Clinical tension pneumothorax: respiratory distress with hypotension, distended neck veins, tracheal deviation, absent breath sounds',
      'Sudden deterioration with rising airway pressures in a ventilated trauma patient',
      'Traumatic cardiac arrest — decompress both sides as part of the algorithm',
    ],
    contraindications: {
      absolute: [],
      relative: [
        'A stable patient in whom a chest radiograph or ultrasound can be obtained first',
        'Simple pneumothorax without tension physiology — go straight to a drain or observe',
      ],
    },
    steps: [
      { text: 'Make the diagnosis clinically. Do not wait for imaging in a hypotensive patient.', caution: 'Tension pneumothorax is a clinical diagnosis. Radiographs are for the ones you were not sure about.' },
      { text: 'Choose the site: fourth or fifth intercostal space in the anterior axillary line is now preferred in adults over the second space mid-clavicular line.' },
      { text: 'Swab the skin. Confirm the rib below your target space with your finger.' },
      { text: 'Insert the cannula perpendicular to the chest wall, walking over the top of the lower rib to avoid the neurovascular bundle.' },
      { text: 'Advance until you feel a give and hear a rush of air, or you aspirate air freely into the syringe.' },
      { text: 'Slide the cannula off the needle, remove the needle, and leave the cannula open to air.' },
      { text: 'Tape the cannula in place and reassess: blood pressure, air entry, ultrasound for lung sliding.' },
      { text: 'Proceed immediately to tube thoracostomy or finger thoracostomy. The cannula will block or kink.' },
    ],
    pearls: [
      'No rush of air does not exclude the diagnosis — the cannula may be too short. Use finger thoracostomy if you are still concerned.',
      'In an intubated or arrested patient, skip the needle and go straight to finger thoracostomy.',
      'Every needle decompression converts the patient into someone who needs a chest drain.',
    ],
    complications: ['Lung laceration', 'Intercostal vessel injury', 'Creation of a pneumothorax where none existed', 'Failure to reach the pleura', 'Cannula kinking or blockage'],
  },
  {
    id: 'tube-thoracostomy',
    name: 'Tube Thoracostomy',
    aka: ['chest tube', 'chest drain', 'intercostal drain'],
    acuity: 'emergent',
    frequency: 'occasional',
    summary:
      'Blunt-dissected drain into the pleural space for air, blood or fluid.',
    video: {
      id: 'mTymlv3Ti1E',
      title: 'Thoracostomy Tube (Chest Drain) Insertion Technique',
    },
    equipment: [
      { item: 'Chest drain', detail: '28-32 Fr for haemothorax, 20-24 Fr or a pigtail for pneumothorax' },
      { item: 'Scalpel with No. 10 blade' },
      { item: 'Large curved (Kelly) clamp', detail: 'The workhorse for blunt dissection' },
      { item: 'Underwater seal drainage system, primed with sterile water' },
      { item: 'Lidocaine 1% with adrenaline', detail: 'Up to 20-30 mL — be generous on the periosteum and pleura' },
      { item: 'Sterile gown, gloves, drape, chlorhexidine' },
      { item: 'Silk suture 0 or 1-0, needle holder, scissors' },
      { item: 'Occlusive dressing and tube-securing device' },
      { item: 'Analgesia and sedation', detail: 'Ketamine or fentanyl — this is a painful procedure' },
    ],
    indications: [
      'Tension or symptomatic pneumothorax',
      'Haemothorax',
      'Traumatic pneumothorax in a patient about to be ventilated or transferred by air',
      'Empyema or complicated parapneumonic effusion',
      'Large symptomatic pleural effusion (usually a smaller catheter)',
    ],
    contraindications: {
      absolute: ['None when the indication is a tension pneumothorax'],
      relative: [
        'Coagulopathy — correct if time allows',
        'Extensive pleural adhesions',
        'Diaphragmatic hernia into the chest',
        'Skin infection over the site',
      ],
    },
    steps: [
      { text: 'Position the patient supine with the arm abducted above the head; head of bed at 30 degrees.' },
      { text: 'Mark the triangle of safety: lateral border of pectoralis major, lateral border of latissimus dorsi, and a line at the level of the nipple. Aim for the fourth or fifth intercostal space in the mid-axillary line.' },
      { text: 'Give systemic analgesia, then sterile prep and drape widely.' },
      { text: 'Infiltrate generously: skin, then down to and along the rib periosteum, then through the pleura until you aspirate air or fluid.' },
      { text: 'Make a 3-4 cm incision along the top of the rib below your target space.' },
      { text: 'Blunt dissect with the clamp over the superior border of the rib until you pop through the parietal pleura. Open the clamp to widen the tract.', caution: 'Always over the top of the rib — the neurovascular bundle runs under the rib above.' },
      { text: 'Insert a gloved finger to confirm you are in the pleural space and sweep for adhesions or an unexpected liver or spleen.' },
      { text: 'Clamp the tube tip and guide it through the tract: apically for air, basally and posteriorly for fluid. Advance until all side holes are inside.' },
      { text: 'Connect to the underwater seal. Look for swinging with respiration, bubbling, or blood drainage.' },
      { text: 'Suture the tube in, apply an occlusive dressing, and order a chest radiograph.' },
    ],
    pearls: [
      'Trocars cause visceral injury. Blunt dissection only.',
      'Drain more than 1500 mL immediately, or more than 200 mL per hour for 2-4 hours, and the patient needs theatre.',
      'The finger sweep is the step that prevents you putting a drain into the liver.',
    ],
    complications: [
      'Malposition (subcutaneous, fissural or intraparenchymal)',
      'Visceral injury to lung, liver, spleen or diaphragm',
      'Intercostal vessel bleeding',
      'Re-expansion pulmonary oedema',
      'Empyema',
      'Persistent air leak',
    ],
  },
]);
