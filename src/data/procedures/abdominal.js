import { defineProcedures } from '../schema.js';

export default defineProcedures('abdominal', [
  {
    id: 'paracentesis',
    name: 'Paracentesis',
    aka: ['abdominal tap', 'ascitic tap', 'peritoneal drainage'],
    acuity: 'urgent',
    frequency: 'occasional',
    summary:
      'Ultrasound-guided needle drainage of ascites for diagnosis of peritonitis or relief of tense abdominal distension.',
    video: {
      id: 'LDIo6xQS7Hc',
      title: 'How To: Ultrasound Guided Paracentesis Procedure (3D)',
    },
    equipment: [
      { item: 'Ultrasound with curvilinear probe' },
      { item: 'Needle or catheter', detail: '20-22 G for diagnostic; 15-18 G catheter or dedicated kit for therapeutic' },
      { item: 'Blood culture bottles', detail: 'Inoculate at the bedside — it doubles the yield' },
      { item: 'Specimen tubes', detail: 'Cell count, albumin, protein, cytology' },
      { item: 'Lidocaine 1%, 25 G and 21 G needles' },
      { item: 'Sterile gloves, drape, chlorhexidine' },
      { item: 'Vacuum bottles or drainage bag', detail: 'For therapeutic drainage' },
      { item: 'Albumin', detail: '6-8 g per litre removed beyond 5 litres', optional: true },
    ],
    indications: [
      'New-onset ascites requiring diagnosis',
      'Suspected spontaneous bacterial peritonitis — fever, abdominal pain, encephalopathy or unexplained deterioration in a cirrhotic',
      'Tense ascites with respiratory compromise or pain',
      'Assessment of the serum-ascites albumin gradient',
    ],
    contraindications: {
      absolute: ['Acute abdomen requiring surgery', 'Disseminated intravascular coagulation with active bleeding'],
      relative: [
        'Pregnancy',
        'Distended bladder — empty it first',
        'Massive bowel distension or ileus',
        'Surgical scars, stomas or visible collaterals at the planned site',
        'Severe thrombocytopenia (routine correction is not required)',
      ],
    },
    steps: [
      { text: 'Have the patient void or place a urinary catheter.' },
      { text: 'Position supine, tilted 15 degrees towards the side you will tap, and wait a minute for fluid to pool.' },
      { text: 'Scan to pick the pocket: usually the left lower quadrant, two fingerbreadths medial and superior to the anterior superior iliac spine. Check for bowel and for the inferior epigastric vessels.', caution: 'Avoid the midline below the umbilicus, surgical scars and any visible caput medusae.' },
      { text: 'Mark the spot. Sterile prep and drape.' },
      { text: 'Infiltrate lidocaine down to the peritoneum, aspirating as you go until fluid returns — that tells you the depth.' },
      { text: 'Use a Z-track: pull the skin 2 cm caudally, advance the needle, then release so the tracks do not line up and leak.' },
      { text: 'Advance with gentle continuous aspiration until fluid flows freely.' },
      { text: 'Diagnostic: take 20-60 mL, inoculating culture bottles at the bedside. Therapeutic: exchange for a catheter and drain to a bag.' },
      { text: 'Remove the needle, apply a dressing, and give albumin if more than 5 litres were removed.' },
    ],
    pearls: [
      'Ascitic neutrophils of 250 per microlitre or more diagnoses spontaneous bacterial peritonitis — treat before the culture returns.',
      'A serum-ascites albumin gradient of 1.1 g/dL or more means portal hypertension.',
      'Persistent leak after the tap is usually a missed Z-track. A single stitch or an ostomy bag manages it.',
    ],
    complications: ['Persistent ascitic leak', 'Abdominal wall haematoma', 'Bowel perforation', 'Introduced infection', 'Post-paracentesis circulatory dysfunction and hypotension'],
  },
  {
    id: 'nasogastric-tube',
    name: 'Nasogastric Tube Insertion',
    aka: ['NG tube', 'gastric decompression', 'Ryles tube'],
    acuity: 'urgent',
    frequency: 'frequent',
    summary:
      'Tube passed through the nose into the stomach for decompression, lavage or feeding.',
    video: {
      id: 'nzBApWQSNdI',
      title: 'Nasogastric Tube Insertion (courtesy NEJM)',
    },
    equipment: [
      { item: 'Nasogastric tube', detail: '14-18 Fr for decompression; large-bore Ewald tube for lavage' },
      { item: 'Water-based lubricant' },
      { item: 'Topical anaesthetic', detail: 'Lidocaine gel or nebulised lidocaine, plus a nasal vasoconstrictor' },
      { item: 'Catheter-tip syringe, 60 mL' },
      { item: 'Cup of water with a straw', detail: 'If the patient can swallow safely' },
      { item: 'pH indicator strips' },
      { item: 'Suction and emesis basin' },
      { item: 'Tape or a nasal bridle for securing' },
    ],
    indications: [
      'Gastric decompression in bowel obstruction or ileus',
      'Intractable vomiting',
      'Gastric lavage or activated charcoal delivery in selected poisonings',
      'Enteral feeding or medication administration',
      'Assessment of upper gastrointestinal bleeding (limited role)',
    ],
    contraindications: {
      absolute: [
        'Suspected basilar skull fracture or significant midface trauma — use the oral route',
        'Known oesophageal stricture, recent oesophageal surgery or caustic ingestion',
      ],
      relative: [
        'Oesophageal varices or coagulopathy',
        'Unprotected airway with reduced consciousness',
        'Severe coagulopathy or nasal obstruction',
      ],
    },
    steps: [
      { text: 'Sit the patient upright with the neck slightly flexed. Explain the procedure and agree a stop signal.' },
      { text: 'Measure from the nose tip to the earlobe to the xiphisternum and mark the tube.' },
      { text: 'Spray a decongestant and apply lidocaine gel generously to the more patent nostril; give it 5 minutes to work.', caution: 'Adequate topical anaesthesia is the difference between a tolerable and an awful procedure.' },
      { text: 'Lubricate the tube and pass it straight back along the floor of the nose, perpendicular to the face — not upwards.' },
      { text: 'At the nasopharynx you will feel resistance; ask the patient to sip water and swallow, and advance with each swallow.' },
      { text: 'Advance to the pre-measured mark. Stop and withdraw if the patient coughs persistently, cannot speak, or the tube coils in the mouth.' },
      { text: 'Confirm placement: aspirate gastric contents and check pH is 5.5 or below. If there is any doubt, or before feeding, confirm on a chest radiograph.', caution: 'Auscultating an air bolus is not a valid confirmation test.' },
      { text: 'Secure to the nose without pressure on the nostril rim, and attach to free drainage or low intermittent suction.' },
    ],
    pearls: [
      'Cooling the tube in ice makes it stiffer and easier to steer; warming softens it for a difficult nose.',
      'A tube that coils in the oropharynx: withdraw to the nasopharynx, flex the neck more, and try again.',
      'Varices are not an absolute contraindication — NG placement in variceal bleeding is safe in practice.',
    ],
    complications: ['Epistaxis', 'Tracheobronchial misplacement', 'Intracranial placement with basilar skull fracture', 'Oesophageal perforation', 'Sinusitis and nasal necrosis from prolonged use'],
  },
]);
