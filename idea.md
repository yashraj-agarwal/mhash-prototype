```
Anvaya

A multi-layer, fully agentic ERP modelled on a temporal knowledge graph. It gives public-works stakeholders a live view of whether an awarded project is still the project that was approved, and what a significant post-award change may imply.



1. Solution

Public contracts are examined in detail before award. After award, contractors and subcontractors can change, materials and costs can move, and timelines and project details can be revised. Those later facts sit in invoices, running-account bills, variation orders, inspections, site photos, and reports. Anvaya holds the original commitment next to that later information as one comparable object, and surfaces variations that may need review, more evidence, or intervention.

What Anvaya is

Anvaya is the operating system for post-award public works in a jurisdiction.





Project / site layer. The live project file: award snapshot, documents, milestone calendar, site log, local changes.



District layer. The district ERP: all projects in the district, the contractor registry for that district, and the district review queue.



City layer. The city ERP: every district beneath it, cross-district contractor patterns, city-level policy weights.



State layer. The state ERP: escalated cases, concentration across cities, the default policy library.

Each layer is the same platform, scoped by jurisdiction, over one knowledge graph. A city officer and a project engineer look at the same ChangeEvent. The city sees it in a rollup; the engineer sees it on the project file.

The graph is the system of record. Agents sit on top of it with tools: document ingest, image comparison, web and public-record search, graph traversal, party registry, project calendar, case routing. People talk to Anvaya in language (“is NH-42 still the project we awarded?”). Answers are compiled from graph objects.

How a project lives in Anvaya





At award, the signed contract, BoQ, specs, named parties, and milestones are extracted into an award snapshot. A project officer confirms it. That snapshot is the commitment.



After award, every later artefact is ingested as a timestamped fact: invoices, RA bills, variation orders, progress reports, inspections, delivery notes, site photos, public filings.



The detector compares each obligation on the snapshot with later facts and emits a ChangeEvent when a policy rule fires.



Each ChangeEvent carries a before / after / delta, an implication pack, linked evidence, and any evidence gaps.



Related events become a ReviewCase on the jurisdiction queue, ordered by a visible priority score.



The officer accepts as explained, requests evidence, or escalates for intervention. That decision is written back onto the graph.

Official variation orders update the current approved baseline and remain visible as explained material change. History is kept, so Anvaya can always show alignment with the original award and alignment with the latest approved variation.

Meaningful variation

A variation is meaningful when jurisdiction policy fires on at least one dimension, or when several smaller moves compound.







Dimension



Policy fires when





Party



Prime contractor, named subcontractor, or key supplier is replaced, added, or drops





Cost



Line item or project total crosses a % or an absolute amount





Schedule



Milestone or completion slips past a grace window





Scope / spec



Material grade, quantity, location, or design no longer matches the award





Process



A material change has no linked variation order or approval on the graph





Pattern



The same party accumulates material cases across projects in the rollup window

Agencies edit thresholds and weights. Three 6% cost moves can trip a 15% cumulative rule. An approved variation that raises cost 20% stays on the file as explained change; the presence of the variation order lowers intervene-priority while keeping the delta in view.

Typos, date-format noise, sub-threshold rounding, and schedule moves inside grace stay in the graph for audit and stay off the queue.

How changes show up

A ChangeEvent is the unit on screen:





obligation (e.g. BoQ item 4.2 wearing course)



dimension (party, cost, spec, schedule, scope, process)



before (award) and after (later facts)



delta, confidence, policy rules that fired



implications



evidence and evidence gaps



recommended action: explain, request evidence, review, or intervene

The project file also shows a side-by-side of snapshot vs current: parties, money, milestones, specs.

Evidence

Evidence is a graph object linked to the fact or the change.







Type



Role





Award artefact



Signed contract page, BoQ line — the “before”





Later artefact



Invoice, RA bill, delivery challan — the “after”





Official variation



Signed VO / amendment — process completeness; may re-baseline





Inspection / lab



Material test, site note — spec and quality





Image



Geo-tagged site photo compared with claimed progress or spec





Public signal



Company master data, gazette, news — corroboration

A ChangeEvent marked explained carries supporting evidence. When cost moves with no variation order, spec moves with no lab report, or a named party changes with no novation, Anvaya records those as evidence gaps and can draft the request (“upload the variation order for item 4.2 covering the 18% increase”).

Implications

Each ChangeEvent answers what the change may mean, in numbers taken from the graph:







Family



What Anvaya states





Fiscal



Extra public money at stake





Delivery



Public asset or service delayed





Quality / spec



Whether the delivered thing is still the specified thing





Accountability



Who is responsible now vs who was awarded





Process



Whether the amendment path is on file





Tender fairness



Whether the change would have affected who could have won





Concentration



Whether this is isolated or the same actor across projects

The system treats every change as a variation that may be legitimate. Copy on the product is alignment, variation, needs explanation, needs evidence. Intervene means a human with authority should look. Closing a case as justified is a normal, successful outcome.

Priority and routing

priority =
    magnitude vs policy
  × dimension weight
  + process-gap bonus
  + public-impact score
  + repeated-actor pattern
  + age of the unreviewed case
  − credit for approved VO or a complete evidence pack







Action



When



Where it sits





Explain



Material and already documented



Project file





Evidence



Material, expected artefacts missing



Project + district queue





Review



Material, evidence incomplete or conflicting



District; city above threshold





Intervene



High magnitude with a process gap, safety/spec, or a repeated pattern



City / state, with the case pack

Officers can override priority with a logged reason. Higher layers inherit scored cases. Their added job is pattern: the same contractor, the same spec substitution, many districts.

Stakeholders







Role



Anvaya gives them





Project engineer / PIU



Snapshot beside the live file; attach evidence; confirm the award snapshot





District officer



District queue; request evidence; review; escalate





City layer



Cross-district cases and contractor patterns; city policy weights





State / department



Escalations, concentration, default policy library





Auditor



Full evidence pack and decision trail





Contractor portal



Requests on their project; upload VOs, invoices, tests



How this plays on one project

Award: Contractor A, named bridge subcontractor B, bitumen grade X, ₹12.4 Cr, 14 months, BoQ item 4.2 at rate R.

Later: RA bill 3 shows item 4.2 +18%; delivery notes list grade Y; a site photo is inconsistent with specified thickness; attendance shows a bridge crew that is not B; no variation order in the tray.

Anvaya opens one ReviewCase with four ChangeEvents (cost, spec, party, process). Implications: extra spend, quality of the public asset, accountability for the bridge, amendment path not on file. The district copilot drafts requests for a VO, a lab test, and a written substitution of B. If those arrive and justify the moves, the case closes as explained and remains on the project file. If they do not, the case rises to city. If Contractor A repeats this pattern elsewhere, state sees the concentration.

That loop is the product: compare, surface, explain implications, connect evidence, prioritise, decide, remember.





2. Technical implementation



Stack







Layer



Choice





Graph store



Neo4j (temporal properties on nodes and edges)





Relational + files



PostgreSQL for users, policy versions, case state; object storage for PDFs and photos





Search



OpenSearch over documents; vector index (pgvector) for clause and photo embeddings





Ingest



Document Intelligence / unstructured parsers for BoQ tables, contracts, invoices





Agents



Orchestrated tool-calling agents (LangGraph) with a shared tool registry





App



Next.js workbench: project file, queues, alignment diff, agent chat





Identity



SSO + jurisdiction RBAC (project / district / city / state / auditor / contractor)





Integration



Connectors for e-procurement exports, PFMS/RA bills, email/document drop, and optional GeM / state portal pulls



Graph model

Nodes. Jurisdiction, Project, Award, ContractDocument, Party, Obligation, Fact, ChangeEvent, Evidence, ReviewCase, Decision, Policy.

Edges. AWARDED_TO, SUBCONTRACTS, SUPPLIES, HAS_OBLIGATION, ASSERTED_ON, CLAIMS, DEVIATES_FROM, SUPPORTED_BY, CONTRADICTED_BY, BUNDLED_IN, DECIDED_AS, UNDER, SCORED_BY.

Award nodes are write-once. Facts are append-only. A signed VO writes a new Award version (baseline_of) and a ChangeEvent of class approved_variation.

Data flow

award PDFs, BoQ, drawings
        │
        ▼
 snapshot agent ──► Obligation nodes (human confirms)
        │
later PDFs, bills, photos, portal feeds
        │
        ▼
 ingest agent ──► candidate Fact nodes ──► schema validator / officer commit
        │
        ▼
 detector (read-only Cypher + policy tables) ──► ChangeEvent
        │
        ▼
 implication + evidence agent ──► implication pack, Evidence links, gap list
        │
        ▼
 ReviewCase on the jurisdiction queue
        │
        ▼
 officer decision ──► Decision node (audit)

Structured fields (amounts, dates, party IDs, spec codes) are compared deterministically. Unstructured inputs become candidate facts with confidence and an evidence pointer; the detector runs on committed facts.

Agents and tools







Agent



Tools





Snapshot



PDF/table extract, proposed graph write





Ingest



PDF extract, image compare against spec/progress, web/public-record search, proposed graph write





Detector



Cypher over snapshot vs current; policy evaluation (read-only)





Implication + evidence



Graph read, search, image, draft evidence-request letter





Review copilot



Graph + case pack; explain in the officer’s language





Rollup



Aggregations for city/state briefs

Registry, calendar, and case tools are available to the workspace: register or update a party, attach a document, open or route a case, record an official VO, query awarded vs actual milestones. Graph writes from agents are proposals until an officer or a schema validator commits. Every commit stores actor, policy version, and timestamp.

Alignment views

The workbench renders snapshot vs current from the same Cypher:





party tree (prime, named subs, suppliers)



cost bars by BoQ item



milestone calendar (awarded vs actual)



spec table (grade, quantity, location)

ChangeEvent cards hang off those views. Chat answers are grounded in the same queries.

Priority engine

Policy is a versioned JSON/table per jurisdiction: thresholds, weights, compounding windows, VO suppressor. The scorer is a pure function of ChangeEvents + Policy + Party pattern queries. The UI shows the terms that produced the number. Overrides write a Decision annotation.

Security and tenancy

One graph, row/edge-level filters on UNDER jurisdiction. City can read descendant districts; project roles write only to their Project. Contractor portal is a separate IdP, write-limited to Evidence uploads on their Project. Object storage is encrypted; PII on Party is minimised. All reads of a ReviewCase are audit-logged.





3. Feasibility

Anvaya is buildable on documents and registers a works department already produces: signed contracts, BoQs, RA bills, variation orders, inspection notes, and a contractor list. The useful core is a confirmed snapshot, structured diffs on money / dates / parties / specs, and a jurisdiction queue. Unstructured ingest and city/state rollups are the same graph with more inputs and wider scopes.

Why it holds





Policy is data. Materiality is percent, amount, and grace days — a table officers already understand. Structured value does not wait on a trained classifier.



Deterministic core. Money, dates, party IDs, and spec codes compare without a model. Models turn PDFs and photos into those fields.



Two human gates. Snapshot lock at award, and commit of candidate facts / case close. The graph is a record officers can defend in audit.



One graph, scoped views. City and state are queries over the same objects.



Append-only facts. Reprocessing a document is idempotent. A bad parse is superseded, not destructive.



What the system is made of







Capability



What it needs





Snapshot + structured detector + district queue



Award PDFs/BoQ, RA bills, SSO, document drop





Unstructured ingest



Object store; parsers; photo and public-record tools





City / state layers



Cases already on the graph; policy library





Connectors



Department access to e-procurement / PFMS / portal feeds



Operating needs

Neo4j + Postgres + object storage + a document-intelligence quota. Officers use a browser. Site photos can store-and-forward; the queue is an office workload. Data residency stays in the deploying government’s account. Extraction can use a government MSA or an on-prem parser. Foundation-model training on contract text is optional and off by default.

In-product handling







Risk



Handling





Incomplete later documents



Evidence gaps are first-class; the case stays open on “request evidence”





Parser error



Candidate facts; officer commit; confidence on the ChangeEvent





Policy disagreement across layers



Versioned Policy per jurisdiction; state default with city overrides





Officer load



Queue is material-only; explained VOs stay on the project file





Vendor response



Contractor portal is upload-and-respond on their project

Feasibility is snapshot quality, detector precision on structured fields, and a queue officers will close. Those are properties of the design, not of a calendar.





4. Business strategy



The economic problem

After award, the public already owns a commitment: a party, a price, a spec, a date. Later facts arrive through bills and site work. When those facts are not held next to the commitment, the department pays in three currencies: extra outlay seen late, delayed public assets, and audit observations with no evidence pack. Anvaya sells a reduction of that information lag — visibility, implication, and a defensible file — to the organisation that already bears the lag.

Payer and user

Government software splits who pays from who uses.







Role



Interest





Economic buyer (E-in-C, secretary, municipal commissioner)



Systemic drift, overrun, audit exposure, one picture of “is this still the approved project?”





Champion (monitoring cell, vigilance / internal audit)



Ranked cases, patterns across districts, decision trail





Daily user (project engineer, district officer)



Snapshot beside the live file, a queue they can close, drafted evidence requests





Counterparty (contractor, optional portal)



A channel to upload VOs, invoices, tests on their project

The product is sold to the buyer and champion. It is used by the engineer. The nested ERP matches that split: the engineer lives on the project file; the champion lives on the city/state rollup; both share the same ChangeEvent.

Value proposition

Anvaya’s job is post-award alignment. The value objects are:





a frozen award next to live bills and site facts



material variation (party, cost, spec, time, process) as a ranked case



implications in rupees, delayed months, and named parties



an evidence pack and a decision trail (audit, RTI, review meetings)



concentration: the same contractor, many jurisdictions

The product treats change as a variation that may be legitimate. That is a commercial stance as well as a product stance: a department will adopt a visibility system; it will resist a black-box accusation engine.

Business model

The unit of value is a jurisdiction on the graph (a division, a municipal corporation, a state department), not a seat and not a one-off project tool.

Two ways to capture that value, same product:





Managed SaaS in a government-compliant cloud (MeitY empaneled): subscription per jurisdiction band + active-project band.



State data-centre licence: annual licence + support when the graph and files must sit on-prem.

Attachable revenue: connector pack (e-procurement, PFMS), contractor-portal seats, document-intelligence volume.

Willingness to pay tracks audit and overrun exposure, which scale with the number of live works under a jurisdiction. Pricing therefore follows jurisdictions and project volume, which is also how the graph grows.

Adoption logic

Public-works organisations are already a tree. Anvaya’s commercial shape copies that tree.





A division is a complete economic unit: it has awards, bills, officers, and a queue. That is enough for the product to create value.



A city / state is the same product with a wider read-scope. Rollup is a property of the data model, so a new district is seats and connectors, not a second system.



Adjacent departments (irrigation, rural roads, CPSUs, ULBs) share the same commitment language: party, BoQ, spec, milestone, variation order. The graph schema travels; the policy table is local.

Distribution is through the people who already own monitoring: engineer-in-chief and the monitoring cell, with NIC / state IT and e-procurement vendors as connector partners. IT hosts; the works side buys.

Compounding

The graph is the asset. Each confirmed snapshot and closed case makes the layer above more valuable: districts produce cases, cities see contractors, the state sees concentration. That is why the firm sells one platform with many jurisdictional ERPs, and why expansion is more of the same graph rather than a new product line.

Switching cost is institutional memory: the award snapshots, evidence packs, and decision trail are the department’s post-award file. Trust requirements (data residency, RBAC, human-committed writes, audit log) are part of the offer, not a later concession.
```