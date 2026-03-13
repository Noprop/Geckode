import * as Y from 'yjs';
import { useGeckodeStore } from '@/stores/geckodeStore';

/**
 * Global registry to access Y.Doc instances by document name.
 * Allows non-React code (e.g. Zustand stores) to access the current document.
 */
class DocumentRegistry {
  private docs = new Map<string, Y.Doc>();

  register(name: string, doc: Y.Doc) {
    this.docs.set(name, doc);
  }

  unregister(name: string) {
    this.docs.delete(name);
  }

  get(name: string): Y.Doc | undefined {
    return this.docs.get(name);
  }

  /** Document name for current route: '' for homepage, projectId string for project page. */
  getCurrentDoc(): Y.Doc | undefined {
    if (typeof window === 'undefined') return undefined;
    const projectId = (window as unknown as { __GECKODE_PROJECT_ID__?: number | null }).__GECKODE_PROJECT_ID__;
    if (projectId != null) {
      const doc = this.get(String(projectId));
      if (doc) return doc;
    }
    return this.get('');
  }
}

export const documentRegistry = new DocumentRegistry();

export function getYDoc(): Y.Doc | undefined {
  const projectId = useGeckodeStore.getState().projectId;
  return documentRegistry.get(String(projectId ?? ''));
}
