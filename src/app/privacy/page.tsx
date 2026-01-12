import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">CredPass – Privacy Policy</h1>
          <p className="text-zinc-400">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <p className="text-zinc-400 leading-relaxed">
            CredPass (“we”, “our”, or “us”) is committed to protecting your privacy and handling your personal and financial data responsibly. This Privacy Policy explains how we collect, use, store, and protect your information when you use the CredPass platform (“Service”).
          </p>
          <p className="text-zinc-400 leading-relaxed">
            By using CredPass, you agree to the practices described in this Privacy Policy.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What CredPass Is (Important Context)</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              CredPass is a privacy-preserving financial trust platform.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We help users generate a verifiable financial trust credential using user-consented data and AI, without exposing raw financial records to third parties.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass is not:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1">
              <li>A bank</li>
              <li>A lender</li>
              <li>A credit bureau</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium text-white mb-2">2.1 Information You Provide Directly</h3>
                    <ul className="list-disc list-inside text-zinc-400 space-y-1">
                        <li>Email address</li>
                        <li>Account credentials</li>
                        <li>Origin country & destination country</li>
                        <li>Uploaded financial files (CSV/PDF), if provided</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-white mb-2">2.2 Financial Data (With Explicit Consent Only)</h3>
                    <p className="text-zinc-400 leading-relaxed mb-2">If you authorize access, we may collect:</p>
                    <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-2">
                        <li>Bank transaction summaries</li>
                        <li>Income patterns</li>
                        <li>Repayment behavior indicators</li>
                    </ul>
                    <p className="text-zinc-400 leading-relaxed font-medium">We do not access data without your explicit consent.</p>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-white mb-2">2.3 Automatically Collected Information</h3>
                    <ul className="list-disc list-inside text-zinc-400 space-y-1">
                        <li>Device type</li>
                        <li>Browser information</li>
                        <li>IP address (for security & fraud prevention)</li>
                        <li>Usage logs</li>
                    </ul>
                </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass uses your data only to:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Generate AI-based financial behavior insights</li>
              <li>Create a CredPass trust credential</li>
              <li>Enable credential verification</li>
              <li>Improve platform reliability and security</li>
              <li>Meet legal and compliance requirements</li>
            </ul>
            <div className="space-y-1 text-zinc-400">
                <p>We do not sell your personal or financial data.</p>
                <p>We do not use your data for advertising.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. User Consent & Control</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">CredPass operates on a consent-first model.</p>
            <p className="text-zinc-400 leading-relaxed mb-2">You control:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>What data is accessed</li>
              <li>When access is granted</li>
              <li>When access is revoked</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              You may revoke consent at any time via your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. AI & Automated Processing Transparency</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass uses AI and machine learning to:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Analyze financial behavior</li>
              <li>Estimate repayment probability</li>
              <li>Generate explanatory summaries</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed mb-2 font-medium text-white">Important Disclosures:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>AI outputs are probabilistic, not guarantees</li>
              <li>AI does not make financial decisions</li>
              <li>Final decisions are made by third-party institutions</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              No automated decision by CredPass has legal or financial consequences on its own.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Data Sharing & Disclosure</h2>
            
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium text-white mb-2">6.1 What We Share</h3>
                    <ul className="list-disc list-inside text-zinc-400 space-y-1">
                        <li>Verifiable trust claims (e.g., trust level, repayment probability)</li>
                        <li>Credential verification status</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-white mb-2">6.2 What We Never Share</h3>
                    <ul className="list-disc list-inside text-zinc-400 space-y-1">
                        <li>Raw bank statements</li>
                        <li>Transaction-level data</li>
                        <li>Personal financial documents</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-white mb-2">6.3 Third-Party Verification</h3>
                    <p className="text-zinc-400 leading-relaxed mb-2">When you share a CredPass ID or QR code:</p>
                    <ul className="list-disc list-inside text-zinc-400 space-y-1">
                        <li>Verifiers only see approved claims</li>
                        <li>No sensitive financial data is exposed</li>
                    </ul>
                </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Data Storage & Security</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">We use industry-standard security practices, including:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Encrypted data transmission</li>
              <li>Secure cloud infrastructure</li>
              <li>Access-controlled environments</li>
              <li>Tamper-resistant records</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              Despite safeguards, no system is completely secure. We continuously improve our security posture.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Financial data is retained only as long as necessary</li>
              <li>Users may request deletion of personal data</li>
              <li>Credential proofs (hashes/records) may be retained for verification integrity</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              We minimize data retention wherever possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Your Privacy Rights</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Access your data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Withdraw consent</li>
              <li>Request data portability</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              You can exercise these rights by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Cross-Border Data Processing</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              CredPass may process data across jurisdictions to provide global services.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We take steps to ensure data protection standards are maintained regardless of location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Cookies & Tracking</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">CredPass uses minimal cookies for:</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
              <li>Authentication</li>
              <li>Session management</li>
              <li>Security</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              We do not use third-party advertising trackers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Children’s Privacy</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              CredPass is not intended for individuals under 18 years of age.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We do not knowingly collect data from minors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Changes to This Privacy Policy</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">
              We may update this Privacy Policy periodically.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-2">
              Changes will be posted on this page with a revised “Last Updated” date.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Continued use of CredPass indicates acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Us</h2>
            <p className="text-zinc-400 leading-relaxed mb-2">For privacy-related questions, requests, or concerns:</p>
            <ul className="list-none text-zinc-400 space-y-1">
              <li>Email: <a href="mailto:privacy@credpass.io" className="text-white hover:underline">privacy@credpass.io</a></li>
              <li>Website: <a href="https://www.credpass.io" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">www.credpass.io</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
