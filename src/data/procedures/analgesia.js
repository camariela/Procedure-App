import { defineProcedures } from '../schema.js';

export default defineProcedures('analgesia', [
  {
    id: 'procedural-sedation',
    name: 'Procedural Sedation and Analgesia',
    aka: ['PSA', 'conscious sedation', 'ketamine sedation'],
    acuity: 'urgent',
    frequency: 'frequent',
    summary:
      'Titrated sedation and analgesia to allow a painful or distressing procedure while preserving airway reflexes where possible.',
    video: {
      id: '297D9UM9fZs',
      title: 'Procedural Sedation in the Emergency Department',
    },
    equipment: [
      { item: 'Monitoring', detail: 'Continuous ECG, SpO2, waveform capnography, blood pressure every 3-5 minutes' },
      { item: 'Oxygen and suction, both tested' },
      { item: 'Bag-valve mask and full airway trolley', detail: 'Including a rescue supraglottic airway' },
      { item: 'IV access' },
      { item: 'Sedative', detail: 'Ketamine 1 mg/kg IV, propofol 0.5-1 mg/kg, or etomidate 0.1 mg/kg' },
      { item: 'Analgesic', detail: 'Fentanyl 1 mcg/kg, titrated' },
      { item: 'Reversal agents', detail: 'Naloxone and flumazenil available, not routinely given', optional: true },
      { item: 'Two clinicians', detail: 'One performs the procedure, one manages sedation and the airway' },
    ],
    indications: [
      'Painful procedures: fracture and joint reduction, cardioversion, abscess drainage, chest drain insertion',
      'Procedures requiring stillness in a distressed or uncooperative patient',
      'Imaging in a patient who cannot cooperate',
    ],
    contraindications: {
      absolute: ['No trained second clinician available to monitor the patient', 'Inadequate monitoring or resuscitation equipment'],
      relative: [
        'Anticipated difficult airway',
        'Haemodynamic instability (favour ketamine or etomidate over propofol)',
        'Recent large meal in a non-urgent procedure',
        'Severe systemic disease — involve anaesthesia',
        'Egg or soy allergy for propofol',
      ],
    },
    steps: [
      { text: 'Assess the airway and comorbidities, take a fasting and allergy history, and obtain consent.' },
      { text: 'Assign roles explicitly: one clinician performs the procedure, a second is responsible for sedation and the airway.', caution: 'The clinician administering sedation must not also be performing the procedure.' },
      { text: 'Apply full monitoring including waveform capnography, and preoxygenate for 3 minutes.' },
      { text: 'Position rescue equipment within reach: bag-valve mask, suction, airway adjuncts and a supraglottic airway.' },
      { text: 'Administer analgesia first, then titrate the sedative in small aliquots to the required depth rather than to a predetermined total dose.' },
      { text: 'Monitor the capnography waveform rather than pulse oximetry alone. Hypoventilation is evident on capnography well before desaturation occurs.' },
      { text: 'Perform the procedure promptly within the window of adequate sedation.' },
      { text: 'Manage respiratory events in sequence: reposition, jaw thrust, airway adjunct, bag-valve mask ventilation. Most events require nothing further.' },
      { text: 'Observe until the patient returns to baseline, then document discharge criteria: alert, ambulating safely, tolerating oral fluids, adequate analgesia, and a responsible adult present.' },
    ],
    pearls: [
      'Ketamine preserves airway reflexes and blood pressure; laryngospasm is rare and usually responds to jaw thrust and positive pressure.',
      'Propofol works fast and wears off fast, at the cost of apnoea and hypotension. Titrate, never bolus to a fixed dose.',
      'Fasting status should not delay a genuinely urgent procedure — the evidence does not support it.',
    ],
    complications: ['Apnoea and hypoventilation', 'Hypotension', 'Laryngospasm', 'Aspiration', 'Emergence reaction with ketamine', 'Myoclonus with etomidate'],
  },
  {
    id: 'digital-nerve-block',
    name: 'Digital Nerve Block',
    aka: ['ring block', 'finger block', 'transthecal block'],
    acuity: 'routine',
    frequency: 'frequent',
    summary:
      'Anaesthesia of a single digit by blocking its paired dorsal and palmar digital nerves.',
    video: {
      id: 'jfj-iIXPCYw',
      title: 'Digital Nerve Block Techniques (dorsal, volar/transthecal, web-space)',
    },
    equipment: [
      { item: 'Lidocaine 1% plain or bupivacaine 0.25%', detail: '3-4 mL total is enough for a finger' },
      { item: '25 G or 27 G needle, 5 mL syringe' },
      { item: 'Chlorhexidine or alcohol swab' },
      { item: 'Gloves and gauze' },
      { item: 'Ultrasound', detail: 'Not needed for digits; useful for wrist-level blocks', optional: true },
    ],
    indications: [
      'Laceration repair of a digit',
      'Nail bed repair, nail trephination or nail removal',
      'Drainage of a paronychia or felon',
      'Reduction of a phalangeal fracture or dislocation',
      'Foreign body removal from a digit',
    ],
    contraindications: {
      absolute: ['Local anaesthetic allergy', 'Infection at the injection site — inject through clean skin instead'],
      relative: [
        'Pre-existing digital ischaemia or vascular compromise',
        'Compartment syndrome of the digit',
        'Severe peripheral vascular disease or Raynaud phenomenon',
      ],
    },
    steps: [
      { text: 'Document sensation and capillary refill in the digit before blocking it.' },
      { text: 'Prepare the skin over the web spaces on either side of the affected digit.' },
      { text: 'Insert the needle into the web space at the level of the metacarpophalangeal joint from the dorsal aspect, where the skin is less sensitive.' },
      { text: 'Advance towards the palmar surface, aspirate, and inject 1-1.5 mL on withdrawal to anaesthetise the palmar digital nerve, then a further 0.5 mL more superficially for the dorsal digital branch.' },
      { text: 'Repeat on the contralateral side of the digit. Each digit is supplied by four digital nerves and both sides must be blocked.', caution: 'A unilateral block is the commonest reason an apparently failed block remains painful.' },
      { text: 'Allow 5-10 minutes for lidocaine and longer for bupivacaine, and test sensation before beginning.' },
      { text: 'Avoid large circumferential volumes at the base of the digit, which raise tissue pressure within a confined space.' },
    ],
    pearls: [
      'Adrenaline-containing local anaesthetic in digits is safe in patients with normal perfusion; the classic prohibition came from older, unbuffered procaine preparations.',
      'A transthecal block through the flexor tendon sheath at the distal palmar crease anaesthetises the whole digit with one injection.',
      'Warm, buffered anaesthetic injected slowly through a fine needle hurts far less.',
    ],
    complications: ['Failed or partial block', 'Intravascular injection', 'Nerve injury', 'Infection', 'Digital ischaemia from excessive volume or pressure'],
  },
]);
