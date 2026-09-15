import { defineProcedures } from '../schema.js';

export default defineProcedures('musculoskeletal', [
  {
    id: 'shoulder-reduction',
    name: 'Anterior Shoulder Reduction',
    aka: ['shoulder relocation', 'glenohumeral dislocation', 'Cunningham', 'scapular manipulation'],
    acuity: 'urgent',
    frequency: 'frequent',
    summary:
      'Relocation of an anteriorly dislocated glenohumeral joint, favouring gentle traction-free techniques first.',
    video: {
      id: 'Xvx-n0vf8pY',
      title: 'The Cunningham Technique (multi-angle)',
    },
    equipment: [
      { item: 'Analgesia', detail: 'IV opioid, intra-articular lidocaine, or procedural sedation' },
      { item: 'Intra-articular lidocaine kit', detail: '20 mL of 1% lidocaine, 20 G spinal needle', optional: true },
      { item: 'Pillow or bolster' },
      { item: 'Shoulder immobiliser or broad arm sling' },
      { item: 'Monitoring', detail: 'If sedation is used: SpO2, ECG, blood pressure, capnography' },
      { item: 'Pre- and post-reduction radiographs' },
    ],
    indications: [
      'Acute anterior glenohumeral dislocation confirmed clinically and radiographically',
      'Recurrent dislocation in a patient with a known pattern',
    ],
    contraindications: {
      absolute: [
        'Associated displaced surgical neck or proximal humerus fracture — orthopaedic reduction',
        'Posterior or inferior dislocation requiring a different technique',
      ],
      relative: [
        'Dislocation present for more than a week',
        'Significant greater tuberosity fracture',
        'Neurovascular compromise — document before and after, and involve orthopaedics',
      ],
    },
    steps: [
      { text: 'Examine and document distal neurovascular status before any manipulation, in particular axillary nerve sensation over the regimental badge area of the lateral deltoid.', caution: 'Document axillary nerve function before and after reduction in every case.' },
      { text: 'Obtain radiographs including an axillary or scapular Y view to confirm the direction of dislocation and exclude associated fracture.' },
      { text: 'Provide analgesia. Intra-articular lidocaine is equivalent to procedural sedation for first-attempt reduction and avoids the associated airway risk.' },
      { text: 'Attempt the Cunningham technique first: patient seated upright, arm adducted with the hand resting on the operator’s shoulder, while massaging the biceps and trapezius as the patient relaxes and shrugs. No traction is applied.' },
      { text: 'If unsuccessful, perform scapular manipulation: patient prone with the arm dependent, or seated, while rotating the inferior tip of the scapula medially and the superior border laterally.' },
      { text: 'If still unreduced, perform external rotation: elbow flexed to 90 degrees and adducted to the trunk, rotating the forearm externally over several minutes.' },
      { text: 'Reserve traction-countertraction for later attempts and pair it with procedural sedation.' },
      { text: 'Confirm reduction: restoration of the deltoid contour, symptomatic relief, and the ability to adduct the hand to the contralateral shoulder.' },
      { text: 'Reassess neurovascular status, immobilise in a sling, and obtain post-reduction radiographs.' },
      { text: 'Arrange orthopaedic follow-up. First-time dislocation in a young patient carries a high rate of recurrent instability.' },
    ],
    pearls: [
      'Relaxation matters more than force. Every technique that relies on pulling harder is a technique that is failing.',
      'A dislocation that will not reduce after two or three good attempts usually has a mechanical block.',
      'Multiple attempts under sedation raise fracture risk — escalate rather than repeat.',
    ],
    complications: ['Axillary nerve injury', 'Fracture of the humeral neck or greater tuberosity', 'Rotator cuff tear', 'Recurrent instability', 'Sedation complications'],
  },
  {
    id: 'arthrocentesis-knee',
    name: 'Knee Arthrocentesis',
    aka: ['joint aspiration', 'knee tap', 'septic arthritis workup'],
    acuity: 'urgent',
    frequency: 'occasional',
    summary:
      'Needle aspiration of the knee joint to diagnose septic arthritis and crystal disease, or to relieve a tense effusion.',
    video: {
      id: 'imISVZaRlZU',
      title: 'Arthrocentesis of the Knee (NEJM)',
    },
    equipment: [
      { item: 'Needle', detail: '18-20 G, 1.5 inch' },
      { item: 'Syringes', detail: '20 mL for aspiration, larger for a big effusion' },
      { item: 'Lidocaine 1% and 25 G needle, plus ethyl chloride spray', optional: true },
      { item: 'Sterile gloves, drape, chlorhexidine' },
      { item: 'Specimen containers', detail: 'Cell count and differential, Gram stain and culture, crystal microscopy' },
      { item: 'Blood culture bottle', detail: 'Improves organism yield', optional: true },
      { item: 'Ultrasound', detail: 'Confirms the effusion and guides a small one', optional: true },
      { item: 'Dressing' },
    ],
    indications: [
      'Suspected septic arthritis — this is the diagnostic test and it is urgent',
      'Undiagnosed monoarticular arthritis',
      'Suspected crystal arthropathy',
      'Symptomatic relief of a large tense haemarthrosis or effusion',
    ],
    contraindications: {
      absolute: ['Cellulitis or infected skin over the puncture site — aspirating through it seeds the joint'],
      relative: [
        'Bacteraemia',
        'Coagulopathy or therapeutic anticoagulation',
        'Prosthetic joint — this should be aspirated by orthopaedics in theatre conditions',
      ],
    },
    steps: [
      { text: 'Position supine with the knee extended, or flexed 15-20 degrees over a rolled towel, with the quadriceps fully relaxed.' },
      { text: 'Identify the landmarks. The superolateral approach has the highest success rate: 1 cm superior and 1 cm lateral to the superolateral corner of the patella.' },
      { text: 'Mark the entry site, then prepare and drape under aseptic technique.' },
      { text: 'Anaesthetise the skin and needle track with lidocaine, or use ethyl chloride spray for a rapid diagnostic aspiration.' },
      { text: 'Insert the needle directed beneath the patella towards the intercondylar notch, angled slightly posteriorly and inferiorly.' },
      { text: 'Aspirate continuously while advancing. Synovial fluid is usually encountered within 2-3 cm.' },
      { text: 'Compress the suprapatellar pouch with the free hand to drain a large effusion, exchanging syringes with a haemostat applied to the needle hub.' },
      { text: 'Withdraw the needle and apply a dressing.' },
      { text: 'Send fluid for cell count and differential, Gram stain and culture, and polarised light microscopy for crystals.' },
    ],
    pearls: [
      'Synovial white cells above 50,000 per microlitre with a neutrophil predominance strongly suggests infection, but no cut-off excludes it — the clinical picture governs.',
      'Crystals and infection can coexist. Finding crystals does not rule out sepsis.',
      'Fat globules in the aspirate suggest an intra-articular fracture.',
    ],
    complications: ['Introduced infection', 'Haemarthrosis', 'Cartilage injury', 'Dry tap from a loculated or small effusion', 'Pain'],
  },
  {
    id: 'compartment-pressure',
    name: 'Compartment Pressure Measurement',
    aka: ['Stryker', 'intracompartmental pressure', 'compartment syndrome'],
    acuity: 'emergent',
    frequency: 'occasional',
    summary:
      'Needle manometry of a muscle compartment when compartment syndrome is suspected but the examination is unreliable.',
    video: {
      id: 'nXuYA32PCXo',
      title: 'Measuring Intracompartmental Pressures (Stryker) - Live Demonstration',
    },
    equipment: [
      { item: 'Handheld compartment pressure monitor', detail: 'Stryker device with side-port needle and prefilled saline syringe' },
      { item: 'Alternative setup', detail: 'Arterial line transducer, 18 G needle, saline-filled tubing and three-way tap', optional: true },
      { item: 'Chlorhexidine, sterile gloves' },
      { item: 'Lidocaine 1% for skin only', detail: 'Do not inject into the compartment — it raises the pressure' },
      { item: 'Blood pressure monitoring', detail: 'You need the diastolic pressure for the delta calculation' },
    ],
    indications: [
      'Suspected acute compartment syndrome in an obtunded, intubated, intoxicated or neurologically impaired patient',
      'Equivocal examination with a high-risk injury such as a tibial shaft fracture or crush injury',
      'Children or others who cannot report pain reliably',
      'Objective documentation before an escalation decision',
    ],
    contraindications: {
      absolute: ['Obvious clinical compartment syndrome in an awake patient — go straight to fasciotomy, do not delay to measure'],
      relative: ['Infection over the insertion site', 'Coagulopathy', 'Prosthetic material in the compartment'],
    },
    steps: [
      { text: 'Where the clinical diagnosis is already established, refer to surgery immediately. Measurement is indicated for the equivocal case.', caution: 'Pain disproportionate to injury and pain on passive stretch precede all other findings. A palpable distal pulse does not exclude the diagnosis.' },
      { text: 'Record the current diastolic blood pressure, which is required to calculate the delta pressure.' },
      { text: 'Assemble the monitor: load the saline-filled syringe and side-port needle, hold the device at the intended angle of insertion, and zero it.' },
      { text: 'Prepare the skin and anaesthetise the skin only, not the compartment.' },
      { text: 'Insert the needle perpendicular to the skin into the compartment, within 5 cm of the fracture level where pressures are highest.' },
      { text: 'Inject less than 0.3 mL of saline to clear the needle, then allow the reading to stabilise.' },
      { text: 'Measure every compartment of the limb. In the leg this means all four: anterior, lateral, superficial posterior and deep posterior.' },
      { text: 'Calculate the delta pressure as diastolic blood pressure minus compartment pressure. A delta of 30 mmHg or less supports fasciotomy.' },
      { text: 'Document all compartment values, the time of measurement and the delta pressure, and involve surgery immediately if abnormal or if the clinical picture deteriorates.' },
    ],
    pearls: [
      'Delta pressure beats any absolute threshold — a compartment pressure of 35 mmHg means something very different at a diastolic of 50 than at 90.',
      'A single normal reading does not exclude an evolving syndrome. Re-measure and re-examine.',
      'Measure near the fracture; pressures fall off quickly with distance.',
    ],
    complications: ['Injury to nerves or vessels', 'Infection', 'Bleeding', 'Falsely low reading from a needle in fascia or a blocked needle', 'Delay to fasciotomy'],
  },
]);
