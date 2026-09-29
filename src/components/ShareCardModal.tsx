import React, { useRef, useState } from 'react';
import { X, Download, Share2, Copy, Check, Sparkles } from 'lucide-react';

interface ShareCardProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  arabic?: string;
  translation: string;
  reference: string;
  type: 'Qur\'an Ayah' | 'Hadith' | 'Dua' | 'Islamic Quote' | 'Daily Reminder';
  author?: string;
}

export const ShareCardModal: React.FC<ShareCardProps> = ({
  isOpen,
  onClose,
  title,
  arabic,
  translation,
  reference,
  type,
  author
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [theme, setTheme] = useState<'emerald' | 'navy' | 'sand'>('emerald');
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const copyText = async () => {
    const textToCopy = `${arabic ? arabic + '\n\n' : ''}"${translation}"\n\n— ${reference}${author ? ' (' + author + ')' : ''}\n\nVia Learn Islam Daily • A Daily Reminder for the Heart`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const shareNative = async () => {
    const textToShare = `${arabic ? arabic + '\n\n' : ''}"${translation}"\n\n— ${reference}\n\nLearn Islam Daily`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Learn Islam Daily - ${type}`,
          text: textToShare,
          url: window.location.href,
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      copyText();
    }
  };

  const downloadAsImage = () => {
    setDownloading(true);
    // Render to Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setDownloading(false);
      return;
    }

    // Themes
    let bgGradient;
    let textColor = '#ffffff';
    let subTextColor = '#d1fae5';
    let goldColor = '#fbbf24';

    if (theme === 'emerald') {
      bgGradient = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGradient.addColorStop(0, '#064e3b');
      bgGradient.addColorStop(0.5, '#047857');
      bgGradient.addColorStop(1, '#022c22');
      textColor = '#ffffff';
      subTextColor = '#a7f3d0';
    } else if (theme === 'navy') {
      bgGradient = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(0.5, '#1e293b');
      bgGradient.addColorStop(1, '#090d16');
      textColor = '#ffffff';
      subTextColor = '#94a3b8';
    } else {
      bgGradient = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGradient.addColorStop(0, '#fbf8f3');
      bgGradient.addColorStop(0.5, '#f5efe6');
      bgGradient.addColorStop(1, '#ebe1d2');
      textColor = '#1c1917';
      subTextColor = '#57534e';
      goldColor = '#b45309';
    }

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Subtle decorative border
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1000, 1000);

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(55, 55, 970, 970);

    // Header badge
    ctx.fillStyle = goldColor;
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LEARN ISLAM DAILY', 540, 110);

    ctx.fillStyle = subTextColor;
    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`• ${type.toUpperCase()} •`, 540, 145);

    // Decorative divider
    ctx.strokeStyle = goldColor;
    ctx.beginPath();
    ctx.moveTo(440, 170);
    ctx.lineTo(640, 170);
    ctx.stroke();

    let currentY = 250;

    // Arabic text if exists
    if (arabic) {
      ctx.fillStyle = textColor;
      ctx.font = '40px "Amiri", "Noto Naskh Arabic", serif';
      ctx.direction = 'rtl';

      // Simple word wrapping for Arabic
      const words = arabic.split(' ');
      let line = '';
      const maxWidth = 880;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, 540, currentY);
          line = words[n] + ' ';
          currentY += 65;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 540, currentY);
      currentY += 70;
    }

    // English / Urdu translation text
    ctx.direction = 'ltr';
    ctx.fillStyle = textColor;
    ctx.font = '28px "Plus Jakarta Sans", sans-serif';

    const wordsTrans = translation.split(' ');
    let lineTrans = '';
    const maxWidthTrans = 880;

    for (let n = 0; n < wordsTrans.length; n++) {
      const testLine = lineTrans + wordsTrans[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidthTrans && n > 0) {
        ctx.fillText(lineTrans, 540, currentY);
        lineTrans = wordsTrans[n] + ' ';
        currentY += 45;
      } else {
        lineTrans = testLine;
      }
    }
    ctx.fillText(lineTrans, 540, currentY);

    // Reference / Footer
    ctx.fillStyle = goldColor;
    ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(reference, 540, 920);

    ctx.fillStyle = subTextColor;
    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('A Daily Reminder for the Heart', 540, 960);

    // Download trigger
    const link = document.createElement('a');
    link.download = `Learn-Islam-Daily-${type.replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-stone-900 rounded-2xl shadow-2xl border border-stone-800 p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/80 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-amber-400 mb-4">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold text-lg text-white">Shareable Spiritual Card</h3>
        </div>

        {/* Theme Selectors */}
        <div className="flex items-center space-x-3 mb-5 text-sm">
          <span className="text-stone-300">Style:</span>
          <button
            onClick={() => setTheme('emerald')}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
              theme === 'emerald'
                ? 'bg-emerald-800 text-emerald-100 border-emerald-500 ring-2 ring-emerald-500/50'
                : 'bg-stone-800 text-stone-300 border-stone-700'
            }`}
          >
            Emerald Grace
          </button>
          <button
            onClick={() => setTheme('navy')}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
              theme === 'navy'
                ? 'bg-slate-800 text-slate-100 border-slate-500 ring-2 ring-slate-500/50'
                : 'bg-stone-800 text-stone-300 border-stone-700'
            }`}
          >
            Midnight Peace
          </button>
          <button
            onClick={() => setTheme('sand')}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
              theme === 'sand'
                ? 'bg-amber-100 text-amber-900 border-amber-400 ring-2 ring-amber-400/50'
                : 'bg-stone-800 text-stone-300 border-stone-700'
            }`}
          >
            Warm Parchment
          </button>
        </div>

        {/* Visual Preview Card */}
        <div
          ref={cardRef}
          className={`p-6 rounded-xl border relative mb-6 shadow-inner transition-colors duration-300 ${
            theme === 'emerald'
              ? 'bg-gradient-to-br from-emerald-900 via-teal-950 to-emerald-950 text-white border-emerald-700/60'
              : theme === 'navy'
              ? 'bg-gradient-to-br from-slate-900 via-stone-900 to-slate-950 text-white border-slate-700/60'
              : 'bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 text-stone-800 border-amber-300/70'
          }`}
        >
          <div className="text-center border-b pb-3 mb-4 border-current/15">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-400">Learn Islam Daily</p>
            <p className="text-[11px] opacity-80">{type}</p>
          </div>

          {arabic && (
            <p className="text-xl md:text-2xl font-arabic text-center leading-loose mb-4 font-normal" dir="rtl">
              {arabic}
            </p>
          )}

          <p className="text-sm md:text-base italic text-center leading-relaxed mb-4">
            "{translation}"
          </p>

          <div className="text-center pt-3 border-t border-current/15">
            <p className="text-xs font-semibold text-amber-400">{reference}</p>
            {author && <p className="text-[11px] opacity-75">{author}</p>}
            <p className="text-[10px] opacity-60 mt-1">A Daily Reminder for the Heart</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={downloadAsImage}
            disabled={downloading}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Creating...' : 'Download Card'}</span>
          </button>

          <button
            onClick={shareNative}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          <button
            onClick={copyText}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition active:scale-95 border border-stone-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
