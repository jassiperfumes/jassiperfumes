import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function StickyBottomBar() {
  const phoneNumber = "9619113993";
  const callUrl = `tel:${phoneNumber}`;
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=Hi%20The%20Perfume%20Corner,%20I%20would%20like%20to%20inquire%20about%20your%20fragrances.`;

  return (
    <>
      {/* Floating Call Button - Bottom Left */}
      <a
        href={callUrl}
        className="floating-btn floating-call-btn"
        aria-label="Call Us 96191 13993"
        title="Call Us: 96191 13993"
      >
        <span className="floating-btn-icon">
          <Phone size={24} color="#FFF9F0" />
        </span>
        <span className="floating-btn-tooltip">Call 96191 13993</span>
      </a>

      {/* Floating WhatsApp Button - Bottom Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-wa-btn"
        aria-label="WhatsApp 96191 13993"
        title="Chat on WhatsApp: 96191 13993"
      >
        <span className="floating-btn-icon">
          <MessageCircle size={26} color="#FFFFFF" />
        </span>
        <span className="floating-btn-tooltip tooltip-right">WhatsApp 96191 13993</span>
      </a>

      <style>{`
        .floating-btn {
          position: fixed;
          bottom: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
          cursor: pointer;
        }

        /* Pulsing Radiating Outer Ring */
        .floating-btn::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          z-index: -1;
          animation: pulse-ring 2.2s infinite ease-out;
        }

        .floating-call-btn {
          left: 24px;
          background: linear-gradient(135deg, #2B211B 0%, #4A3528 100%);
          border: 2px solid #C5A059;
        }

        .floating-call-btn::before {
          border: 2px solid rgba(197, 160, 89, 0.7);
        }

        .floating-call-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 25px rgba(197, 160, 89, 0.6);
        }

        .floating-wa-btn {
          right: 24px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border: 2px solid #FFFFFF;
        }

        .floating-wa-btn::before {
          border: 2px solid rgba(37, 211, 102, 0.7);
        }

        .floating-wa-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
        }

        /* Icon Animation wrapper */
        .floating-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-call-btn .floating-btn-icon {
          animation: call-shake 3.8s infinite ease-in-out;
        }

        .floating-wa-btn .floating-btn-icon {
          animation: wa-bounce 3.8s infinite ease-in-out;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        @keyframes call-shake {
          0%, 80%, 100% { transform: rotate(0deg); }
          84% { transform: rotate(16deg); }
          88% { transform: rotate(-14deg); }
          92% { transform: rotate(12deg); }
          96% { transform: rotate(-8deg); }
        }

        @keyframes wa-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          85% { transform: translateY(-5px) scale(1.08); }
          90% { transform: translateY(2px); }
          95% { transform: translateY(-2px); }
        }

        .floating-btn-tooltip {
          position: absolute;
          white-space: nowrap;
          background: #2B211B;
          color: #FFF9F0;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          border: 1px solid #C5A059;
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .floating-call-btn .floating-btn-tooltip {
          left: 68px;
          transform: translateX(-10px);
        }

        .floating-wa-btn .floating-btn-tooltip {
          right: 68px;
          transform: translateX(10px);
        }

        .floating-btn:hover .floating-btn-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }

        @media (max-width: 640px) {
          .floating-btn {
            bottom: 18px;
            width: 50px;
            height: 50px;
          }
          .floating-call-btn {
            left: 16px;
          }
          .floating-wa-btn {
            right: 16px;
          }
          .floating-btn-tooltip {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
