import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { registerBlockly } from '../index';
import {
  generateFlatWorkspace,
  generateNestedWorkspace,
  generateRealisticWorkspace,
  countBlocks,
  type WorkspaceState,
} from './workspaceGenerator';

describe('Blockly Compilation Performance', () => {
  let workspace: Blockly.Workspace;

  beforeAll(() => {
    // Register custom blocks and generators
    registerBlockly();
  });

  beforeEach(() => {
    // Create a fresh workspace for each test
    workspace = new Blockly.Workspace();
  });

  afterAll(() => {
    workspace?.dispose();
  });

  interface CompilationResult {
    timeMs: number;
    code: string;
    blockCount: number;
  }

  function measureCompilation(workspaceState: WorkspaceState): CompilationResult {
    workspace.clear();
    Blockly.serialization.workspaces.load(workspaceState, workspace);
    const blockCount = countBlocks(workspaceState);

    const start = performance.now();
    const code = javascriptGenerator.workspaceToCode(workspace);
    const end = performance.now();

    return { timeMs: end - start, code, blockCount };
  }

  function logResult(name: string, result: CompilationResult): void {
    console.log(
      `[PERF] ${name}: ${result.timeMs.toFixed(2)}ms for ${result.blockCount} blocks ` +
      `(${(result.timeMs / result.blockCount).toFixed(3)}ms/block)`
    );
  }

  describe('Flat workspace (sequential setProperty blocks)', () => {
    it('compiles 10 blocks (baseline)', () => {
      const state = generateFlatWorkspace(10);
      const result = measureCompilation(state);
      logResult('10 flat blocks', result);

      expect(result.code).toBeTruthy();
      expect(result.code.length).toBeGreaterThan(0);
    });

    it('compiles 100 blocks', () => {
      const state = generateFlatWorkspace(100);
      const result = measureCompilation(state);
      logResult('100 flat blocks', result);

      expect(result.code).toBeTruthy();
      expect(result.code.length).toBeGreaterThan(0);
    });

    it('compiles 500 blocks', () => {
      const state = generateFlatWorkspace(500);
      const result = measureCompilation(state);
      logResult('500 flat blocks', result);

      expect(result.code).toBeTruthy();
      expect(result.code.length).toBeGreaterThan(0);
    });

    it('compiles 1000 blocks', () => {
      const state = generateFlatWorkspace(1000);
      const result = measureCompilation(state);
      logResult('1000 flat blocks', result);

      expect(result.code).toBeTruthy();
      expect(result.code.length).toBeGreaterThan(0);
    });
  });

  describe('Nested workspace (deeply nested if-statements)', () => {
    it('compiles 10 levels deep', () => {
      const state = generateNestedWorkspace(10);
      const result = measureCompilation(state);
      logResult('10 nested levels', result);

      expect(result.code).toBeTruthy();
    });

    it('compiles 25 levels deep', () => {
      const state = generateNestedWorkspace(25);
      const result = measureCompilation(state);
      logResult('25 nested levels', result);

      expect(result.code).toBeTruthy();
    });

    it('compiles 50 levels deep', () => {
      const state = generateNestedWorkspace(50);
      const result = measureCompilation(state);
      logResult('50 nested levels', result);

      expect(result.code).toBeTruthy();
    });
  });

  describe('Realistic workspace (mixed event handlers)', () => {
    it('compiles small game (4 events, 5 blocks each)', () => {
      const state = generateRealisticWorkspace(4, 5);
      const result = measureCompilation(state);
      logResult('small game', result);

      expect(result.code).toBeTruthy();
    });

    it('compiles medium game (10 events, 10 blocks each)', () => {
      const state = generateRealisticWorkspace(10, 10);
      const result = measureCompilation(state);
      logResult('medium game', result);

      expect(result.code).toBeTruthy();
    });

    it('compiles large game (20 events, 20 blocks each)', () => {
      const state = generateRealisticWorkspace(20, 20);
      const result = measureCompilation(state);
      logResult('large game', result);

      expect(result.code).toBeTruthy();
    });
  });

  describe('Summary comparison', () => {
    it('compares compilation times across different workspace types', () => {
      const results: { name: string; result: CompilationResult }[] = [];

      // Run all scenarios
      results.push({ name: '100 flat', result: measureCompilation(generateFlatWorkspace(100)) });
      results.push({ name: '500 flat', result: measureCompilation(generateFlatWorkspace(500)) });
      results.push({ name: '25 nested', result: measureCompilation(generateNestedWorkspace(25)) });
      results.push({ name: '50 nested', result: measureCompilation(generateNestedWorkspace(50)) });
      results.push({ name: 'medium game', result: measureCompilation(generateRealisticWorkspace(10, 10)) });
      results.push({ name: 'large game', result: measureCompilation(generateRealisticWorkspace(20, 20)) });

      console.log('\n=== COMPILATION PERFORMANCE SUMMARY ===');
      console.log('| Workspace Type | Blocks | Time (ms) | ms/block |');
      console.log('|----------------|--------|-----------|----------|');

      for (const { name, result } of results) {
        const msPerBlock = result.timeMs / result.blockCount;
        console.log(
          `| ${name.padEnd(14)} | ${String(result.blockCount).padStart(6)} | ${result.timeMs.toFixed(2).padStart(9)} | ${msPerBlock.toFixed(3).padStart(8)} |`
        );
      }
      console.log('========================================\n');

      // Verify all compilations succeeded
      for (const { result } of results) {
        expect(result.code).toBeTruthy();
      }
    });
  });
});
