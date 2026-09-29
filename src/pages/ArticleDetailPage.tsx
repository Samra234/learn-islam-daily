import React, { useEffect } from 'react';
import { ChevronLeft, Clock, Calendar, BookOpen, ShieldAlert, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ArticleDetailPageProps {
  slug: string;
  onBack: () => void;
  onOpenArticle: (slug: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug, onBack, onOpenArticle }) => {
  const { articles, addToHistory } = useApp();
  const article = articles.find(a => a.slug === slug) || articles[0];

  useEffect(() => {
    if (article) {
      addToHistory(article.id, 'article', article.title);
    }
  }, [article]);

  const relatedArticles = articles.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Articles</span>
      </button>

      {/* Article Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span className="font-semibold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {article.category}
          </span>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published {article.createdAt}</span>
          </div>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-snug">
          {article.title}
        </h1>

        <p className="text-stone-600 text-sm sm:text-base leading-relaxed italic border-l-4 border-emerald-600 pl-4 py-1">
          {article.summary}
        </p>
      </div>

      {/* Advisory Note */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Religious Guidance Notice</span>
          <p className="mt-0.5 leading-relaxed text-stone-700">
            This article is prepared solely for spiritual enrichment and moral reflection. It does not replace individualized rulings (fatwa) by recognized authorities of Islamic jurisprudence.
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm prose prose-stone max-w-none text-stone-800 leading-relaxed space-y-6">
        {article.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2 key={index} className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900 pt-4 border-t border-stone-100">
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('> ')) {
            return (
              <blockquote key={index} className="p-4 rounded-xl bg-emerald-50/60 border-l-4 border-emerald-600 text-emerald-950 italic text-sm my-4">
                {paragraph.replace('> ', '')}
              </blockquote>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
            return (
              <div key={index} className="text-sm sm:text-base pl-2 space-y-2">
                {paragraph.split('\n').map((item, itemIdx) => (
                  <p key={itemIdx} className="leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            );
          }
          return (
            <p key={index} className="text-sm sm:text-base leading-relaxed font-light">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Verified References */}
      {article.references && article.references.length > 0 && (
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
          <h3 className="font-cinzel text-base font-bold text-stone-900 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>Islamic Source References</span>
          </h3>
          <ul className="list-disc list-inside text-xs sm:text-sm text-stone-600 space-y-1">
            {article.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="font-cinzel text-xl font-bold text-stone-900">
            More Educational Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map(rel => (
              <div
                key={rel.id}
                onClick={() => onOpenArticle(rel.slug)}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600/50 hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-stone-900 text-base mt-2 hover:text-emerald-800 transition">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {rel.summary}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 mt-3 block">
                  Read Article →
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
