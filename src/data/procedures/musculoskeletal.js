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
      { text: 'Examine and document neurovascular status, especially axillary nerve sensation over the deltoid badge area, before you touch anything.', caution: 'Document the axillary nerve before and after. Every time.' },
      { text: 'Obtain radiographs including an axillary or scapular Y view to confirm direction and exclude fracture.' },
      { text: 'Give analgesia. Intra-articular lidocaine works as well as sedation for most first attempts and avoids the airway risk.' },
      { text: 'Try Cunningham first: patient sitting upright, arm adducted with the hand on your shoulder, then massage the biceps and trapezius while the patient relaxes and shrugs. No traction at all.' },
      { text: 'If that fails, try scapular manipulation: patient prone with the arm hanging, or seated, while you rotate the inferior tip of the scapula medially and the superior edge laterally.' },
      { text: 'If still unreduced, use external rotation: elbow at 90 degrees, adducted to the side, and rotate the forearm outward slowly over several minutes.' },
      { text: 'Reserve traction-countertraction for later attempts and pair it with sedation.' },
      { text: 'Confirm reduction: the deltoid contour is restored, the patient reports relief, and the hand reaches the opposite shoulder.' },
      { text: 'Reassess neurovascular status, immobilise in a sling, and obtain post-reduction films.' },
      { text: 'Arrange orthopaedic follow-up; first-time dislocation in a young patient carries a high recurrence rate.' },
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
      { text: 'Position the patient supine with the knee extended or flexed 15-20 degrees over a rolled towel, and let the quadriceps relax completely.' },
      { text: 'Identify the landmarks. The superolateral approach has the highest success rate: 1 cm superior and 1 cm lateral to the superolateral corner of the patella.' },
      { text: 'Mark the site, then sterile prep and drape.' },
      { text: 'Anaesthetise the skin and the track with lidocaine, or use ethyl chloride spray for a quick tap.' },
      { text: 'Insert the needle aiming under the patella towards the intercondylar notch, angled slightly posteriorly and inferiorly.' },
      { text: 'Aspirate continuously as you advance. Fluid usually appears within 2-3 cm.' },
      { text: 'Milk the suprapatellar pouch with your free hand to empty a large effusion; swap syringes using a haemostat on the needle hub if needed.' },
      { text: 'Withdraw the needle and apply a dressing.' },
      { text: 'Send fluid for cell count and differential, Gram stain and culture, and polarised microscopy for crystals.' },
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
      { text: 'If the clinical diagnosis is already clear, call surgery now. Measurement is for the uncertain case.', caution: 'Pain out of proportion and pain on passive stretch precede every other sign. A palpable pulse does not exclude the diagnosis.' },
      { text: 'Record the current diastolic blood pressure — you need it to calculate the delta pressure.' },
      { text: 'Assemble the monitor: load the saline syringe and side-port needle, hold at the angle of intended insertion, and zero the device.' },
      { text: 'Clean the skin and anaesthetise the skin only.' },
      { text: 'Insert the needle into the compartment, perpendicular to the skin, within 5 cm of the fracture level where pressures are highest.' },
      { text: 'Inject less than 0.3 mL of saline to clear the needle, then wait for the reading to stabilise.' },
      { text: 'Measure every compartment of the limb. In the leg, all four: anterior, lateral, superficial posterior and deep posterior.' },
      { text: 'Calculate the delta pressure: diastolic blood pressure minus compartment pressure. A delta of 30 mmHg or less supports fasciotomy.' },
      { text: 'Document all values, the time and the delta, and involve surgery immediately if abnormal or if the clinical picture worsens.' },
    ],
    pearls: [
      'Delta pressure beats any absolute threshold — a compartment pressure of 35 mmHg means something very different at a diastolic of 50 than at 90.',
      'A single normal reading does not exclude an evolving syndrome. Re-measure and re-examine.',
      'Measure near the fracture; pressures fall off quickly with distance.',
    ],
    complications: ['Injury to nerves or vessels', 'Infection', 'Bleeding', 'Falsely low reading from a needle in fascia or a blocked needle', 'Delay to fasciotomy'],
  },
]);
