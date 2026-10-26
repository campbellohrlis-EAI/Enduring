import { useEffect } from 'react';
import { isActioWordmarkToken, normaliseActioWordmark, splitActioWordmarkText } from '@/lib/actioWordmark';

const SKIPPED_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'OPTION', 'CODE', 'PRE']);

function replaceActioInTextNode(node: Text) {
  const parent = node.parentElement;
  const value = node.nodeValue;

  if (!parent || !value || SKIPPED_TAGS.has(parent.tagName)) return;

  if (parent.matches('strong.actio-wordmark')) {
    const normalised = normaliseActioWordmark(value);
    if (value !== normalised) parent.textContent = normalised;
    return;
  }

  const existingStrong = parent.closest('strong');
  if (existingStrong) {
    if (
      isActioWordmarkToken(value.trim())
      && isActioWordmarkToken(existingStrong.textContent?.trim() ?? '')
    ) {
      existingStrong.classList.add('actio-wordmark');
      existingStrong.textContent = 'actio';
      return;
    }

    const normalised = value.replace(/\bactio\b/gi, 'actio');
    if (value !== normalised) node.nodeValue = normalised;
    return;
  }

  if (parent.closest('.actio-wordmark')) return;

  const parts = splitActioWordmarkText(value);
  if (parts.length === 1) return;

  const fragment = document.createDocumentFragment();
  parts.forEach((part) => {
    if (!part) return;
    if (!isActioWordmarkToken(part)) {
      fragment.append(part);
      return;
    }

    const wordmark = document.createElement('strong');
    wordmark.className = 'actio-wordmark';
    wordmark.textContent = normaliseActioWordmark(part);
    fragment.append(wordmark);
  });
  parent.replaceChild(fragment, node);
}

function enhanceActioWordmark(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    replaceActioInTextNode(root as Text);
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;

  while ((node = walker.nextNode())) textNodes.push(node as Text);
  textNodes.forEach(replaceActioInTextNode);
}

/**
 * Ensures the lower-case actio brand wordmark is consistently bold whenever
 * content is rendered from static JSX, data records, FAQs, or rich article copy.
 */
export default function ActioWordmarkEnhancer() {
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    enhanceActioWordmark(root);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => enhanceActioWordmark(node));
        if (mutation.type === 'characterData') replaceActioInTextNode(mutation.target as Text);
      });
    });

    observer.observe(root, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
