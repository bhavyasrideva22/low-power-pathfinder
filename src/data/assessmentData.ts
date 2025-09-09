import { AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Personality & Interest Assessment',
    description: 'Evaluating your psychological compatibility with Low-Power Network Engineering',
    duration: '6 minutes',
    questions: [
      {
        id: 'p1',
        text: "I'm curious about how wireless devices communicate with each other.",
        type: 'likert',
        category: 'psychometric',
        subcategory: 'interest'
      },
      {
        id: 'p2',
        text: "I enjoy solving small, technical problems that require attention to detail.",
        type: 'likert',
        category: 'psychometric',
        subcategory: 'personality'
      },
      {
        id: 'p3',
        text: "I prefer working on structured technical challenges over open-ended ones.",
        type: 'likert',
        category: 'psychometric',
        subcategory: 'cognitive'
      },
      {
        id: 'p4',
        text: "Even without external pressure, I'd pursue learning about IoT networks.",
        type: 'likert',
        category: 'psychometric',
        subcategory: 'motivation'
      },
      {
        id: 'p5',
        text: "I bounce back quickly from technical setbacks.",
        type: 'likert',
        category: 'psychometric',
        subcategory: 'grit'
      },
      {
        id: 'p6',
        text: "I find it fascinating when technology works behind the scenes.",
        type: 'likert',
        category: 'psychometric',
        subcategory: 'interest'
      },
      {
        id: 'p7',
        text: "I can spend hours debugging a technical problem without getting frustrated.",
        type: 'likert',
        category: 'psychometric',
        subcategory: 'persistence'
      },
      {
        id: 'p8',
        text: "I prefer environments where I can work independently on technical projects.",
        type: 'likert',
        category: 'psychometric',
        subcategory: 'work_style'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Aptitude & Knowledge',
    description: 'Testing your current technical understanding and problem-solving abilities',
    duration: '10 minutes',
    questions: [
      {
        id: 't1',
        text: "Which protocol is best suited for long-range, low-power communication?",
        type: 'multiple-choice',
        options: ['WiFi', 'LoRa', 'Bluetooth', '5G'],
        category: 'technical',
        subcategory: 'protocols'
      },
      {
        id: 't2',
        text: "What is the primary advantage of Zigbee over WiFi for IoT devices?",
        type: 'multiple-choice',
        options: ['Higher bandwidth', 'Lower power consumption', 'Better security', 'Faster speeds'],
        category: 'technical',
        subcategory: 'protocols'
      },
      {
        id: 't3',
        text: "How would you calculate the battery life of a sensor that transmits 10 packets per hour?",
        type: 'multiple-choice',
        options: [
          'Divide battery capacity by transmission power',
          'Multiply packets by power consumption and divide by battery capacity',
          'Calculate energy per packet × packets per hour, then divide battery capacity by hourly consumption',
          'Just estimate based on similar devices'
        ],
        category: 'technical',
        subcategory: 'power_management'
      },
      {
        id: 't4',
        text: "What happens when two devices transmit on the same frequency at the same time?",
        type: 'multiple-choice',
        options: ['They automatically switch frequencies', 'Signal collision occurs', 'The stronger signal wins', 'They merge into one signal'],
        category: 'technical',
        subcategory: 'rf_basics'
      },
      {
        id: 't5',
        text: "Which programming language is most commonly used for microcontroller programming?",
        type: 'multiple-choice',
        options: ['Python', 'JavaScript', 'C/C++', 'Java'],
        category: 'technical',
        subcategory: 'programming'
      },
      {
        id: 't6',
        text: "What is the typical range of LoRaWAN in urban environments?",
        type: 'multiple-choice',
        options: ['100 meters', '1-2 kilometers', '10-15 kilometers', '50+ kilometers'],
        category: 'technical',
        subcategory: 'protocols'
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive evaluation of your readiness across six key dimensions',
    duration: '5 minutes',
    questions: [
      {
        id: 'w1',
        text: "I'd be willing to spend 6+ months learning complex networking protocols.",
        type: 'likert',
        category: 'wiscar',
        subcategory: 'will'
      },
      {
        id: 'w2',
        text: "I follow IoT and networking technology news regularly.",
        type: 'likert',
        category: 'wiscar',
        subcategory: 'interest'
      },
      {
        id: 'w3',
        text: "I have experience with at least one programming language.",
        type: 'likert',
        category: 'wiscar',
        subcategory: 'skill'
      },
      {
        id: 'w4',
        text: "I can break down complex problems into smaller, manageable parts.",
        type: 'likert',
        category: 'wiscar',
        subcategory: 'cognitive'
      },
      {
        id: 'w5',
        text: "I learn best through hands-on experimentation and projects.",
        type: 'likert',
        category: 'wiscar',
        subcategory: 'ability'
      },
      {
        id: 'w6',
        text: "I understand how IoT networks are used in smart cities and agriculture.",
        type: 'likert',
        category: 'wiscar',
        subcategory: 'realWorld'
      }
    ]
  }
];

export const correctAnswers: { [key: string]: number } = {
  't1': 1, // LoRa
  't2': 1, // Lower power consumption
  't3': 2, // Calculate energy per packet calculation
  't4': 1, // Signal collision occurs
  't5': 2, // C/C++
  't6': 1  // 1-2 kilometers
};