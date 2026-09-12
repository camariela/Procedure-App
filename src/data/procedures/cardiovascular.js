import { defineProcedures } from '../schema.js';

export default defineProcedures('cardiovascular', [
  {
    id: 'pericardiocentesis',
    name: 'Pericardiocentesis',
    aka: ['pericardial drainage', 'tamponade drainage'],
    acuity: 'emergent',
    summary:
      'Ultrasound-guided needle drainage of pericardial fluid to relieve tamponade physiology.',
    video: {
      id: '61FPmtw5RAM',
      title: 'Ultrasound-Guided Pericardiocentesis',
    },
    equipment: [
      { item: 'Ultrasound with phased-array probe', detail: 'Subxiphoid and parasternal windows' },
      { item: 'Spinal needle', detail: '18 G, 7-9 cm, or a dedicated pericardiocentesis needle' },
      { item: 'Seldinger kit with pigtail catheter', detail: 'For a drain rather than a single aspiration' },
      { item: '20 mL and 60 mL syringes, three-way tap' },
      { item: 'Lidocaine 1% with 25 G and 21 G needles' },
      { item: 'Chlorhexidine, sterile drape, gown, gloves' },
      { item: 'Sterile probe cover and sterile gel' },
      { item: 'Drainage bag and suture or securing device' },
      { item: 'Cardiac monitor and defibrillator in the room' },
    ],
    indications: [
      'Cardiac tamponade with haemodynamic compromise',
      'Pulseless electrical activity with a pericardial effusion on ultrasound',
      'Diagnostic sampling of an effusion of unknown cause in a stable patient (usually not an ED procedure)',
    ],
    contraindications: {
      absolute: [
        'Traumatic tamponade where thoracotomy is available and indicated — drainage is a temporising measure at best',
      ],
      relative: [
        'Small or posterior-only effusion with no safe window',
        'Aortic dissection with haemopericardium — decompression can accelerate bleeding; go to theatre',
        'Uncorrected coagulopathy in a stable patient',
      ],
    },
    steps: [
      { text: 'Confirm tamponade on ultrasound: effusion plus right atrial or right ventricular diastolic collapse, plethoric IVC.' },
      { text: 'Sit the patient at 30-45 degrees, monitor, oxygen, IV access, and give fluid to support preload.' },
      { text: 'Scan first and pick the window with the largest fluid pocket closest to the skin — usually parasternal or apical, not subxiphoid.', caution: 'Choose the window by ultrasound, not by tradition.' },
      { text: 'Full sterile prep, drape, sterile probe cover. Infiltrate skin and track with lidocaine.' },
      { text: 'Advance the needle under real-time ultrasound guidance, aspirating continuously, aiming at the fluid pocket.' },
      { text: 'Stop as soon as fluid returns. If unsure of position, inject agitated saline and confirm bubbles in the pericardial space, not the ventricle.' },
      { text: 'Aspirate 30-50 mL — this alone usually restores haemodynamics.' },
      { text: 'For ongoing drainage, pass the guidewire, dilate and place the pigtail catheter by Seldinger technique.' },
      { text: 'Secure the catheter, attach to a drainage bag, and arrange urgent cardiology or cardiothoracic review. Repeat the echo.' },
    ],
    pearls: [
      'Blood from the pericardium usually does not clot; blood from a ventricle does.',
      'A small volume produces a large haemodynamic change — you are not trying to empty the sac in the resus room.',
      'Ventricular ectopy on advancing the needle means you are touching myocardium. Withdraw slightly.',
    ],
    complications: [
      'Ventricular or coronary artery laceration',
      'Pneumothorax',
      'Dysrhythmia',
      'Hepatic or gastric injury via a subxiphoid approach',
      'Post-decompression pulmonary oedema',
    ],
  },
  {
    id: 'synchronised-cardioversion',
    name: 'Synchronised Cardioversion',
    aka: ['DC cardioversion', 'electrical cardioversion', 'shock the tachycardia'],
    acuity: 'emergent',
    summary:
      'Shock delivered on the R wave to terminate an unstable organised tachydysrhythmia.',
    video: {
      id: 'c165XePDzko',
      title: 'Synchronized Cardioversion Demonstration HD 1080p',
    },
    equipment: [
      { item: 'Defibrillator with synchronisation mode' },
      { item: 'Self-adhesive pads', detail: 'Anterolateral or anteroposterior placement' },
      { item: 'Sedation', detail: 'Ketamine or propofol plus an analgesic, with an airway plan' },
      { item: 'Airway trolley and suction' },
      { item: 'Continuous ECG, SpO2, non-invasive blood pressure, capnography' },
      { item: 'IV access and fluids' },
      { item: 'Resuscitation drugs available' },
    ],
    indications: [
      'Unstable tachydysrhythmia with a pulse: hypotension, ischaemic chest pain, acute heart failure, altered mental state',
      'Stable AF or flutter where a rhythm-control strategy has been chosen',
      'Stable SVT or VT refractory to drug therapy',
    ],
    contraindications: {
      absolute: [
        'Sinus tachycardia — treat the cause',
        'Pulseless VT or VF — these need unsynchronised defibrillation',
      ],
      relative: [
        'Digoxin toxicity (use low energy, expect malignant rhythms)',
        'AF of more than 48 hours without anticoagulation or a TOE in a stable patient — thromboembolic risk',
        'Multifocal atrial tachycardia — will not respond',
      ],
    },
    steps: [
      { text: 'Confirm the patient has a pulse and the rhythm is organised. Record a 12-lead if time allows.' },
      { text: 'Apply pads, attach monitoring leads, secure IV access, and preoxygenate.' },
      { text: 'Sedate with a short-acting agent, titrated, with the airway trolley open.' },
      { text: 'Press SYNC. Confirm a marker sits on every R wave before charging.', caution: 'SYNC must be re-selected after every shock on most machines.' },
      { text: 'Select energy: 120-200 J biphasic for AF, 50-100 J for flutter or SVT, 100 J for monomorphic VT.' },
      { text: 'Charge, confirm everyone is clear including oxygen, and deliver the shock. Expect a short delay while the machine waits for the R wave.' },
      { text: 'Reassess rhythm and pulse. Escalate energy in steps for repeat attempts.' },
      { text: 'Monitor until sedation has worn off, then repeat the 12-lead ECG and address the underlying cause.' },
    ],
    pearls: [
      'If the machine will not discharge, SYNC is on but it cannot find an R wave — increase QRS size on the monitor or switch lead.',
      'Anteroposterior pad placement converts refractory AF more often than anterolateral.',
      'Polymorphic VT with a pulse needs unsynchronised shocks — the machine cannot track the R wave.',
    ],
    complications: ['Skin burns', 'Induced VF', 'Thromboembolism', 'Sedation-related hypoventilation and hypotension', 'Post-shock bradycardia'],
  },
  {
    id: 'transcutaneous-pacing',
    name: 'Transcutaneous Pacing',
    aka: ['external pacing', 'TCP'],
    acuity: 'emergent',
    summary:
      'External electrical capture of the ventricle as a bridge in symptomatic bradycardia.',
    video: {
      id: 'I6toFKkZSw8',
      title: 'Transcutaneous Pacing',
    },
    equipment: [
      { item: 'Defibrillator or monitor with pacing mode' },
      { item: 'Pacing pads', detail: 'Anteroposterior placement gives the most reliable capture' },
      { item: 'ECG electrodes and cable', detail: 'The machine paces off the monitor leads, not the pads' },
      { item: 'Analgesia and sedation', detail: 'Fentanyl plus midazolam, or ketamine' },
      { item: 'IV access, atropine, adrenaline or isoprenaline infusion' },
      { item: 'Transvenous pacing kit', detail: 'For the definitive step', optional: true },
    ],
    indications: [
      'Symptomatic bradycardia unresponsive to atropine',
      'Complete heart block or Mobitz II with haemodynamic compromise',
      'Bradycardia with hypotension, ischaemia, heart failure or altered mental state',
      'Standby pacing in high-risk conduction disease',
    ],
    contraindications: {
      absolute: ['Severe hypothermia with bradycardia — the slow rate is appropriate and pacing can provoke VF'],
      relative: [
        'Asystole with a prolonged down time — pacing does not improve outcome',
        'Conscious patient who cannot tolerate the discomfort without sedation',
      ],
    },
    steps: [
      { text: 'Attach monitor leads and pacing pads; anterior pad over the left precordium, posterior pad between the spine and the left scapula.' },
      { text: 'Give analgesia and sedation before you start pacing — capture hurts.' },
      { text: 'Select pacing mode and set the rate at 60-80 per minute.' },
      { text: 'Increase current from the lowest setting until electrical capture appears: a wide QRS with a T wave after every spike.' },
      { text: 'Confirm mechanical capture with a femoral pulse or ultrasound, never the carotid — muscle twitch is easily mistaken for a pulse.', caution: 'Electrical capture without mechanical capture is not a perfusing rhythm.' },
      { text: 'Set the output about 10 mA above the capture threshold.' },
      { text: 'Reassess blood pressure and mental state, then arrange transvenous pacing or cardiology review.' },
    ],
    pearls: [
      'Failure to capture is usually inadequate current, poor pad contact, or pads too far apart.',
      'Treat reversible causes in parallel: hyperkalaemia, beta blocker or calcium channel blocker overdose, ischaemia.',
      'Transcutaneous pacing is a bridge, never the destination.',
    ],
    complications: ['Pain and skeletal muscle contraction', 'Skin burns', 'Failure to capture', 'Induced dysrhythmia', 'Missed mechanical non-capture'],
  },
]);
