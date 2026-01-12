import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 md:py-20 relative">
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
         <Link href="/auth/signup" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
            <div className="p-2 rounded-full bg-zinc-900 border border-white/10 group-hover:bg-zinc-800 transition-colors">
               <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-medium hidden md:inline-block">Back to Signup</span>
         </Link>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 pt-12 md:pt-0">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">CredPass – Terms & Conditions</h1>
          <p className="text-zinc-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <p className="text-zinc-400 leading-relaxed">
            Welcome to CredPass. These Terms & Conditions (“Terms”) govern your access to and use of the CredPass platform, including our website, applications, APIs, and related services (collectively, the “Service”).
          </p>
          <p className="text-zinc-400 leading-relaxed">
            By accessing or using CredPass, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. About CredPass</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              CredPass is a privacy-preserving financial trust platform designed to help individuals carry verifiable financial credibility across borders. CredPass does not function as a bank, credit bureau, or lender.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass provides:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Behavioral financial analysis</li>
              <li>AI-generated trust insights</li>
              <li>Verifiable trust credentials</li>
              <li>Secure verification tools for third parties</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              CredPass does not issue loans, make credit decisions, or guarantee financial outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Eligibility</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">To use CredPass, you must:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Be at least 18 years old</li>
              <li>Have the legal right to share your financial data</li>
              <li>Provide accurate and truthful information</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              By using CredPass, you confirm that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">You are responsible for:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activities conducted under your account</li>
              <li>Not sharing your account with others</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              CredPass reserves the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. User Consent & Data Authorization</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              CredPass operates strictly on explicit user consent.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-2">By using the Service, you may voluntarily authorize CredPass to:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Access financial transaction data</li>
              <li>Analyze income, repayment, and spending patterns</li>
              <li>Generate a CredPass trust credential</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed mb-2 font-medium text-white">Important:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1">
              <li>Consent is revocable at any time</li>
              <li>No data is accessed without explicit approval</li>
              <li>CredPass does not scrape or secretly collect data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Financial Data Usage</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass uses financial data only to:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Perform behavioral analysis</li>
              <li>Generate AI-based trust insights</li>
              <li>Create verifiable trust credentials</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass does not:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Sell financial data</li>
              <li>Share raw bank statements with third parties</li>
              <li>Store unnecessary personal financial records</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              All processing follows privacy-by-design principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. AI-Generated Insights Disclaimer</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass uses artificial intelligence to generate:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Trust levels</li>
              <li>Repayment probability estimates</li>
              <li>Explanatory summaries</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed mb-2">You acknowledge that:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>AI outputs are probabilistic, not guarantees</li>
              <li>Results are informational, not financial advice</li>
              <li>CredPass does not guarantee acceptance by banks, landlords, or institutions</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              Final decisions always rest with third-party verifiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. CredPass Credentials</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">A CredPass credential:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Represents verified claims, not raw data</li>
              <li>Has an expiration date</li>
              <li>May be revoked or reissued</li>
              <li>Can be verified via CredPass systems</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              Credentials are not credit scores and should not be treated as such.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Verification by Third Parties</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">When you share a CredPass ID or QR code:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Verifiers can confirm authenticity</li>
              <li>Only approved trust claims are displayed</li>
              <li>No personal financial data is revealed</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              CredPass is not responsible for decisions made by verifiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Data Security & Privacy</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass employs industry-standard security measures, including:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Secure cloud infrastructure</li>
              <li>Encrypted data transmission</li>
              <li>Restricted access controls</li>
              <li>Tamper-resistant recordkeeping</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              Despite best efforts, no system is 100% secure. You acknowledge and accept this risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Data Retention & Deletion</h2>
            <ul className="list-disc list-inside text-zinc-400 space-y-1">
              <li>Financial data is retained only as long as necessary</li>
              <li>Users may request deletion of their data</li>
              <li>Some records may be retained for legal, audit, or security reasons</li>
              <li>Credential hashes or proofs may remain for verification integrity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Prohibited Uses</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">You agree NOT to:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Submit false or misleading information</li>
              <li>Attempt to manipulate AI outputs</li>
              <li>Use CredPass for illegal or fraudulent purposes</li>
              <li>Reverse engineer or abuse the platform</li>
              <li>Misrepresent CredPass credentials</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              Violations may result in termination and legal action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Intellectual Property</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">
              All content, trademarks, software, and designs associated with CredPass are the intellectual property of CredPass or its licensors.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-2">You may not:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1">
              <li>Copy or redistribute the platform</li>
              <li>Use branding without permission</li>
              <li>Modify or resell the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Limitation of Liability</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">To the maximum extent permitted by law:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>CredPass is provided “as is”</li>
              <li>CredPass is not liable for:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Financial losses</li>
                  <li>Rejected applications</li>
                  <li>Third-party decisions</li>
                  <li>Data inaccuracies beyond our control</li>
                </ul>
              </li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              Use of the Service is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Indemnification</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">You agree to indemnify and hold CredPass harmless from any claims arising from:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1">
              <li>Your misuse of the Service</li>
              <li>Violation of these Terms</li>
              <li>Submission of inaccurate data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. Service Availability</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass may:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Modify or discontinue features</li>
              <li>Perform maintenance</li>
              <li>Update the Service</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              We do not guarantee uninterrupted availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">16. Changes to Terms</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">
              CredPass may update these Terms from time to time. Continued use of the Service constitutes acceptance of updated Terms.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We encourage users to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">17. Governing Law</h2>
            <p className="text-zinc-400 leading-relaxed">
              These Terms shall be governed by and interpreted in accordance with the laws applicable to the jurisdiction in which CredPass operates, without regard to conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">18. Contact Information</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">For questions, concerns, or requests related to these Terms:</p>
            <ul className="list-none text-zinc-400 space-y-1">
              <li>Email: <a href="mailto:support@credpass.io" className="text-white hover:underline">support@credpass.io</a></li>
              <li>Website: <a href="https://www.credpass.io" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">www.credpass.io</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
