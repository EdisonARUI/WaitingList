'use client';

/**
 * Section component explaining the three-step shared ownership process.
 * Displays the steps with icons, descriptions, and visual flow indicators.
 * @returns The how it works section with process steps and flow visualization
 */
export default function HowItWorksSection() {
  /** 
   * Three-step process data with visual styling information.
   * Each step includes icon, colors, and descriptive content.
   */
  const steps = [
    {
      stepNumber: 'STEP 1',
      title: 'Browse & Choose',
      description: 'Explore available properties and select the home that fits your needs and budget. Start with as little as 25% ownership.',
      icon: '🔍',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      stepNumber: 'STEP 2',
      title: 'Apply & Qualify',
      description: "Complete our streamlined application process. We'll help you understand your financing options and qualification requirements.",
      icon: '📝',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      stepNumber: 'STEP 3',
      title: 'Move In & Grow',
      description: 'Move into your new home and gradually increase your ownership share over time as your financial situation improves.',
      icon: '🏠',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <section className="how-it-works-section bg-white min-h-screen flex items-center py-16">
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="section-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to start your homeownership journey with shared ownership
          </p>
        </div>
        
        <div className="steps-grid grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step-item text-center">
              <div className="step-icon-container mb-6">
                <div className={`step-icon ${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className={`step-number text-sm font-semibold ${step.textColor}`}>
                  {step.stepNumber}
                </div>
              </div>
              <h3 className="step-title text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="step-description text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="process-flow-visual mt-12 hidden md:block">
          <div className="flow-connector flex items-center justify-center space-x-8">
            <div className="connector-line w-32 h-1 bg-gray-200"></div>
            <div className="connector-arrow text-gray-400 text-2xl">→</div>
            <div className="connector-line w-32 h-1 bg-gray-200"></div>
            <div className="connector-arrow text-gray-400 text-2xl">→</div>
            <div className="connector-line w-32 h-1 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 