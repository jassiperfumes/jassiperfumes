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
        <Phone size={24} color="#FFF9F0" />
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
        <MessageCircle size={26} color="#FFFFFF" />
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

        .floating-call-btn {
          left: 24px;
          background: linear-gradient(135deg, #2B211B 0%, #4A3528 100%);
          border: 2px solid #C5A059;
        }

        .floating-call-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 25px rgba(197, 160, 89, 0.5);
        }

        .floating-wa-btn {
          right: 24px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border: 2px solid #FFFFFF;
        }

        .floating-wa-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
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
