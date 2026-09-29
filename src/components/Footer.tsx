import React from 'react';
import { BookOpen, Moon, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-300">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-cinzel text-lg font-bold text-white tracking-wide">
                Learn Islam Daily
              </span>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs">
              A Daily Reminder for the Heart • Qur'an • Hadith • Duas • Islamic Reminders • Motivation
            </p>

            <div className="flex items-center space-x-3 pt-2 text-stone-400">
              <span className="hover:text-amber-400 cursor-pointer transition">Facebook</span>
              <span>•</span>
              <span className="hover:text-amber-400 cursor-pointer transition">Instagram</span>
              <span>•</span>
              <span className="hover:text-amber-400 cursor-pointer transition">YouTube</span>
            </div>
          </div>

          {/* Col 2: Sacred Content */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 text-amber-400">
              Spiritual Library
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('quran')} className="hover:text-white transition">
                  Qur'an Ayahs by Topic
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('topics')} className="hover:text-white transition">
                  Topic Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hadith')} className="hover:text-white transition">
                  Authentic Hadith
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('duas')} className="hover:text-white transition">
                  Daily & Prophetic Duas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quotes')} className="hover:text-white transition">
                  Wisdom of the Sahabah
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Inspiration & Articles */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 text-amber-400">
              Daily Guidance
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('daily-reminder')} className="hover:text-white transition">
                  Today's Daily Reminder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('motivation')} className="hover:text-white transition">
                  Motivational Reflections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-white transition">
                  Educational Articles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('saved')} className="hover:text-white transition">
                  My Saved Reminders
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Legal */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 text-amber-400">
              Platform & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  About Us & Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition">
                  Contact & Feedback
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition">
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclaimer')} className="hover:text-white transition">
                  Religious Advisory Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800 text-center text-stone-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Learn Islam Daily. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Crafted with reverence for the global Muslim Ummah</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
