export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="border-4 border-black bg-brutal-pink text-white p-12 shadow-brutal-lg mb-12">
          <h1 className="font-brutal text-5xl md:text-7xl mb-6">
            ABOUT PRYVENTO
          </h1>
          <p className="font-mono text-xl max-w-3xl">
            MADE IN INDIA. WE DON&apos;T DO SUBTLE. WE DON&apos;T DO BORING. WE DO BRUTAL.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="font-brutal text-4xl mb-6">OUR STORY</h2>
            <div className="font-mono text-lg space-y-4">
              <p>
                FOUNDED IN 2024 IN MUMBAI, INDIA, PRYVENTO WAS BORN FROM A SIMPLE IDEA:
                BAGS SHOULD BE AS BOLD AS THE PEOPLE WHO CARRY THEM.
              </p>
              <p>
                WE CRAFT BAGS WITH BRUTAL HONESTY AND UNCOMPROMISING QUALITY.
                USING PREMIUM INDIAN MATERIALS AND TRADITIONAL CRAFTSMANSHIP,
                WE CREATE BAGS THAT ARE BUILT TO LAST A LIFETIME.
              </p>
              <p>
                BRUTALISM ISN&apos;T JUST AN AESTHETIC—IT&apos;S A PHILOSOPHY. IT&apos;S
                ABOUT HONESTY IN DESIGN. FUNCTION OVER PRETENSE. STRENGTH
                OVER DELICACY. MADE WITH PRIDE IN INDIA.
              </p>
            </div>
          </div>

          <div className="border-4 border-black bg-brutal-yellow p-8 shadow-brutal">
            <h3 className="font-brutal text-3xl mb-6">OUR VALUES</h3>
            <ul className="font-mono space-y-4">
              <li>
                <strong className="font-brutal text-xl">→ BRUTAL HONESTY</strong>
                <br />
                No fake promises. No hidden fees.
              </li>
              <li>
                <strong className="font-brutal text-xl">→ BOLD DESIGN</strong>
                <br />
                Stand out or sit down.
              </li>
              <li>
                <strong className="font-brutal text-xl">→ BUILT TO LAST</strong>
                <br />
                Indian craftsmanship. Lifetime durability.
              </li>
              <li>
                <strong className="font-brutal text-xl">→ NO COMPROMISES</strong>
                <br />
                We don&apos;t dilute our vision for trends.
              </li>
            </ul>
          </div>
        </div>

        {/* Mission */}
        <div className="border-4 border-black bg-white p-12 shadow-brutal-lg mb-12">
          <h2 className="font-brutal text-4xl mb-6">OUR MISSION</h2>
          <p className="font-mono text-xl leading-relaxed max-w-4xl">
            TO CREATE BAGS THAT REFUSE TO BLEND IN. TO EMPOWER PEOPLE WHO
            AREN&apos;T AFRAID TO STAND OUT. TO PROVE THAT FUNCTION AND BOLD
            AESTHETICS CAN COEXIST. TO BUILD A COMMUNITY OF UNAPOLOGETICALLY
            BRUTAL INDIVIDUALS.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border-4 border-black bg-brutal-cyan p-6 text-center shadow-brutal">
            <p className="font-brutal text-5xl mb-2">10K+</p>
            <p className="font-mono">BRUTAL CUSTOMERS</p>
          </div>
          <div className="border-4 border-black bg-brutal-yellow p-6 text-center shadow-brutal">
            <p className="font-brutal text-5xl mb-2">50+</p>
            <p className="font-mono">PRODUCT DESIGNS</p>
          </div>
          <div className="border-4 border-black bg-brutal-pink text-white p-6 text-center shadow-brutal">
            <p className="font-brutal text-5xl mb-2">100%</p>
            <p className="font-mono">BRUTAL GUARANTEE</p>
          </div>
          <div className="border-4 border-black bg-white p-6 text-center shadow-brutal">
            <p className="font-brutal text-5xl mb-2">∞</p>
            <p className="font-mono">LIFETIME WARRANTY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
