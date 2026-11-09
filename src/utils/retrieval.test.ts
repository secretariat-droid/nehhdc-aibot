import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  findRelevantKnowledge, 
  checkCautionaryQuery, 
  buildContextFromEntries, 
  tokenize 
} from './retrieval.ts';

test('tokenize extracts normalized lowercase words without stopwords', () => {
  const tokens = tokenize('What are the training programmes in NEHHDC?');
  assert.ok(tokens.includes('training'));
  assert.ok(tokens.includes('programmes'));
  assert.ok(tokens.includes('nehhdc'));
  assert.ok(!tokens.includes('what'));
  assert.ok(!tokens.includes('are'));
  assert.ok(!tokens.includes('the'));
  assert.ok(!tokens.includes('in'));
});

test('Query 1 & 2: "What is NEHHDC?" & "When was NEHHDC established?" retrieves about-organization', () => {
  const res1 = findRelevantKnowledge('What is NEHHDC?');
  assert.ok(res1.entries.length > 0);
  assert.equal(res1.entries[0].id, 'about-organization');
  assert.ok(res1.sources.some(s => s.url === 'https://www.nehhdc.com/'));

  const res2 = findRelevantKnowledge('When was NEHHDC established?');
  assert.ok(res2.entries.some(e => e.id === 'about-organization'));
  assert.ok(res2.entries[0].content.includes('1977'));
});

test('Query 3: "What services does NEHHDC offer to artisans?" retrieves artisan services', () => {
  const res = findRelevantKnowledge('What services does NEHHDC offer to artisans?');
  assert.ok(res.entries.length > 0);
  const ids = res.entries.map(e => e.id);
  assert.ok(ids.includes('artisan-initiatives') || ids.includes('training-programmes'));
});

test('Query 4: "Does NEHHDC provide institutional sales services?" retrieves institutional-sales', () => {
  const res = findRelevantKnowledge('Does NEHHDC provide institutional sales services?');
  assert.ok(res.entries.length > 0);
  assert.equal(res.entries[0].id, 'institutional-sales');
  assert.ok(res.entries[0].title.includes('Corporate Gifting'));
  assert.ok(res.entries[0].content.includes('Corporate'));
});

test('Query 5: "Where can I find NEHHDC tenders?" retrieves tenders-procurement', () => {
  const res = findRelevantKnowledge('Where can I find NEHHDC tenders?');
  assert.ok(res.entries.length > 0);
  assert.equal(res.entries[0].id, 'tenders-procurement');
  assert.ok(res.sources.some(s => s.url.includes('/tenders/')));
});

test('Query 6: "How can I contact NEHHDC?" retrieves contact-offices', () => {
  const res = findRelevantKnowledge('How can I contact NEHHDC?');
  assert.ok(res.entries.length > 0);
  assert.equal(res.entries[0].id, 'contact-offices');
  assert.ok(res.sources.some(s => s.url.includes('/contact-us')));
  assert.ok(res.entries[0].content.includes('Guwahati'));
  assert.ok(res.entries[0].content.includes('Shillong'));
});

test('Query 7: "Can NEHHDC guarantee me a job?" triggers cautionary flag and instructions', () => {
  const cautionary = checkCautionaryQuery('Can NEHHDC guarantee me a job?');
  assert.equal(cautionary.isCautionary, true);
  assert.equal(cautionary.reason, 'Job Guarantee Inquiry');
  assert.ok(cautionary.mandatoryInstruction?.includes('does NOT guarantee jobs'));

  const res = findRelevantKnowledge('Can NEHHDC guarantee me a job?');
  assert.equal(res.isCautionary, true);
  assert.ok(res.entries.some(e => e.id === 'recruitment-careers'));
});

test('Query 8: "What is the latest tender deadline?" triggers cautionary flag preventing deadline guessing', () => {
  const cautionary = checkCautionaryQuery('What is the latest tender deadline?');
  assert.equal(cautionary.isCautionary, true);
  assert.equal(cautionary.reason, 'Tender Deadline Inquiry');
  assert.ok(cautionary.mandatoryInstruction?.includes('Do NOT guess or state any specific tender deadline'));

  const res = findRelevantKnowledge('What is the latest tender deadline?');
  assert.equal(res.isCautionary, true);
  assert.equal(res.entries[0].id, 'tenders-procurement');
  assert.ok(res.sources.some(s => s.url.includes('/tenders/')));
});

test('buildContextFromEntries injects verified entries and cautionary instructions into prompt context', () => {
  const res = findRelevantKnowledge('Can NEHHDC guarantee me a job?');
  const cautionary = checkCautionaryQuery('Can NEHHDC guarantee me a job?');
  const context = buildContextFromEntries(res.entries, cautionary.mandatoryInstruction);
  assert.ok(context.includes('VERIFIED NEHHDC KNOWLEDGE BASE INFORMATION'));
  assert.ok(context.includes('SPECIAL CAUTIONARY DIRECTIVE FOR THIS QUESTION'));
  assert.ok(context.includes('does NOT guarantee jobs'));
});
