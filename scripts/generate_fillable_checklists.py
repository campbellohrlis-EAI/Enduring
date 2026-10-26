from pathlib import Path
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

OUT_DIR = Path('/home/ubuntu/webdev-static-assets')
LOGO_PATH = OUT_DIR / 'ea-logo-v5-pdf.png'

NAVY = HexColor('#0D3349')
GOLD = HexColor('#C9A84C')
CREAM = HexColor('#FAF7F2')
INK = HexColor('#20323A')
MUTED = HexColor('#5A6A70')
RULE = HexColor('#D8D0C4')

VARIANTS = {
    'cfo': {
        'title': 'CFO Decision Checklist',
        'subtitle': 'A fillable six-step worksheet for capital decisions that need to withstand finance, operations, and committee scrutiny.',
        'intro': 'Use this worksheet when environmental, resilience, operating-cost, or compliance options are competing for capital. Work from your own financial criteria and surface the information that would change the decision.',
        'prompts': [
            ('Frame the capital decision', 'Name the decision, financial threshold, and committee date. Separate the decision from the broader programme.'),
            ('Establish the financial starting point', 'Record available utility, operating, asset, and financial data. Identify which gaps could materially change the economics.'),
            ('Screen competing uses of capital', 'Compare credible environmental options with the capital alternatives already on the plan, including timing and asset-cycle constraints.'),
            ('Test the investment case', 'Make assumptions, incentives, vendor relationships, and confidence levels visible. Test why this option outranks the alternatives.'),
            ('Commit an accountable next action', 'Name the action, executive owner, decision gate, and capital path needed to move it forward.'),
            ('Plan delivery and verification', 'Define procurement, operating windows, baseline, measurement method, and the evidence finance will use to test the result.'),
        ],
        'focus_label': 'Capital decision / portfolio context',
    },
    'municipal': {
        'title': 'Municipal Decision Checklist',
        'subtitle': 'A fillable six-step worksheet for asset renewal and environmental decisions that must work through staff, council, and capital planning.',
        'intro': 'Use this worksheet when a facility, infrastructure, service-level, or funding decision needs a clearer sequence. Frame the work in the language council and staff use: lifecycle cost, reserves, service, operating impact, and delivery readiness.',
        'prompts': [
            ('Frame the public-capital decision', 'Name the asset, service-level question, council or staff decision, and the capital-plan timing that matters.'),
            ('Establish available municipal evidence', 'List asset-condition, lifecycle, operating, utility, feasibility, and prior-study information that already exists.'),
            ('Screen the renewal and resilience field', 'Compare credible responses against service levels, lifecycle cost, funding readiness, procurement reality, and operating constraints.'),
            ('Test the recommendation for council', 'Make deferral implications, assumptions, grant dependencies, and the rationale for the selected option visible.'),
            ('Commit the next staff action', 'Name the staff owner, decision gate, preparatory evidence, and reporting route needed to move the decision forward.'),
            ('Plan procurement and verification', 'Define the delivery path, funding or procurement schedule, baseline, and the measure of service or cost improvement.'),
        ],
        'focus_label': 'Asset / service-level / council context',
    },
    'real-estate': {
        'title': 'Real Estate Decision Checklist',
        'subtitle': 'A fillable six-step worksheet for portfolio and property decisions involving operating cost, tenant value, capital planning, and risk.',
        'intro': 'Use this worksheet for a site, building, or portfolio decision. It helps connect available property, utility, operating, leasing, and capital-plan information to one practical next action.',
        'prompts': [
            ('Frame the property decision', 'Name the asset, portfolio issue, investment horizon, and the property or investment decision that needs to be made.'),
            ('Establish available portfolio evidence', 'Record available utility, tenant, building-system, maintenance, lease, capex, and insurance information.'),
            ('Screen the property options', 'Compare credible actions against operating cost, tenant impact, asset-cycle timing, disruption, capital availability, and environmental benefit.'),
            ('Test the investment rationale', 'State assumptions, incentive or vendor dependencies, confidence levels, and why the action outranks the alternatives.'),
            ('Commit the accountable next action', 'Name the asset manager, property manager, owner representative, decision gate, and budget route.'),
            ('Plan delivery and verification', 'Define scope, vendor process, tenant and operating windows, baseline, and the metric used to test performance after delivery.'),
        ],
        'focus_label': 'Asset / portfolio / property context',
    },
    'freight-procurement': {
        'title': 'Freight & Procurement Decision Checklist',
        'subtitle': 'A fillable six-step worksheet for narrowing supply-chain exposure into one defensible freight, sourcing, or supplier action.',
        'intro': 'Use this worksheet when a supplier, lane, category, or sourcing dependency needs a clearer commercial and operational decision. Start with records available today, make assumptions visible, and direct deeper supplier work only where it can change the next move.',
        'prompts': [
            ('Frame the supply-chain decision', 'Name the supplier, lane, category, or dependency in scope, the business consequence, the decision owner, and the relevant contract, renewal, or sourcing date.'),
            ('Assemble available evidence', 'Record existing spend, volume, freight, operating, emissions, supplier, and disruption information. Label what is measured, estimated, or unknown.'),
            ('Screen materiality', 'Test spend, volume, production criticality, concentration, exposure, and emissions intensity. State why this item deserves attention before the wider supply base.'),
            ('Test commercial leverage', 'Review contract timing, specifications, relationship strength, alternatives, qualification constraints, and the practical ability to influence an outcome.'),
            ('Evaluate freight and procurement levers', 'Consider mode, route, consolidation, load factor, packaging, order frequency, contract language, supplier improvement, and sourcing alternatives.'),
            ('Commit one accountable next action', 'State the recommended first move, financial criterion, assumptions, owner, supplier or internal counterpart, delivery milestone, and verification method.'),
        ],
        'focus_label': 'Supplier / lane / category context',
    },
    'municipal-supply-chain': {
        'title': 'Municipal Supply Chain Decision Checklist',
        'subtitle': 'A fillable six-step worksheet for municipal procurement, service continuity, and supplier decisions that must work through staff, policy, and council oversight.',
        'intro': 'Use this worksheet when a supplier, contract, fleet or materials category, route, or operational dependency needs a clearer public-sector decision. Start with records available today, identify what could change service or cost, and assign a practical next action within the procurement path.',
        'prompts': [
            ('Frame the municipal supply-chain decision', 'Name the supplier, contract, category, route, or dependency in scope, the affected service, decision owner, and relevant procurement, renewal, or council timing.'),
            ('Assemble available municipal evidence', 'Record available spend, purchase-order, service-level, fleet, route, contractor, supplier, disruption, and operating information. Label what is measured, estimated, or unknown.'),
            ('Screen public-service materiality', 'Test service continuity, spend, asset or operational criticality, supplier concentration, disruption exposure, and environmental intensity. State why this item deserves attention before the wider vendor base.'),
            ('Test municipal leverage and constraints', 'Review procurement policy, contract timing, specifications, tender requirements, supplier alternatives, qualification constraints, and the practical ability to influence an outcome.'),
            ('Evaluate procurement and delivery levers', 'Consider consolidation, route or fleet changes, local or regional sourcing, service specifications, contract language, supplier improvement, resilience planning, and implementation timing.'),
            ('Commit one accountable next action', 'State the recommended first move, decision criteria, assumptions, staff owner, procurement route, council or management gate, delivery milestone, and verification method.'),
        ],
        'focus_label': 'Service / supplier / procurement context',
    },
}


def wrap_lines(text, width, font, size):
    words = text.split()
    line = ''
    lines = []
    for word in words:
        candidate = f'{line} {word}'.strip()
        if stringWidth(candidate, font, size) <= width:
            line = candidate
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_wrapped(c, text, x, y, width, font='Helvetica', size=9.3, leading=12, color=MUTED):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap_lines(text, width, font, size):
        c.drawString(x, y, line)
        y -= leading
    return y


def field(c, name, x, y, width, height=12, value=''):
    c.acroForm.textfield(
        name=name,
        value=value,
        x=x,
        y=y,
        width=width,
        height=height,
        borderStyle='underlined',
        borderColor=RULE,
        fillColor=white,
        textColor=INK,
        fontName='Helvetica',
        fontSize=8.0,
        forceBorder=True,
    )


def draw_header(c, title, width, height, margin, continuation=False):
    logo_width = 132
    logo_height = 43
    logo_x = width - margin - logo_width
    logo_y = height - 78
    title_width = logo_x - margin - 12
    title_size = 21.5
    while stringWidth(title, 'Times-Bold', title_size) > title_width and title_size > 18:
        title_size -= 0.5

    c.setFillColor(NAVY)
    c.rect(0, height - 90, width, 90, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.roundRect(logo_x - 3, logo_y - 2, logo_width + 6, logo_height + 4, 2.5, fill=1, stroke=0)
    c.drawImage(str(LOGO_PATH), logo_x, logo_y, width=logo_width, height=logo_height, preserveAspectRatio=True, anchor='c', mask='auto')
    c.setFillColor(GOLD)
    c.setFont('Helvetica-Bold', 8.5)
    c.drawString(margin, height - 33, 'FILLABLE DECISION WORKSHEET' if not continuation else 'ENDURING ADVANTAGE  |  DECISION WORKSHEET')
    c.setFillColor(CREAM)
    c.setFont('Times-Bold', title_size)
    c.drawString(margin, height - 63, title if not continuation else f'{title}  |  Continued')


def make_pdf(key, data):
    path = OUT_DIR / f'ea-six-step-decision-checklist-{key}.pdf'
    c = canvas.Canvas(str(path), pagesize=A4)
    width, height = A4
    margin = 42
    y = height - 44

    draw_header(c, data['title'], width, height, margin)

    y = height - 112
    y = draw_wrapped(c, data['subtitle'], margin, y, width - margin * 2, font='Times-Italic', size=11.4, leading=13, color=NAVY)
    y -= 3
    y = draw_wrapped(c, data['intro'], margin, y, width - margin * 2, size=8.9, leading=10.5, color=MUTED)
    y -= 6

    c.setStrokeColor(GOLD)
    c.setLineWidth(1.25)
    c.line(margin, y, width - margin, y)
    y -= 14

    labels = [('Organisation', 'organisation'), (data['focus_label'], 'context'), ('Prepared by', 'prepared_by'), ('Date', 'date')]
    field_width = (width - margin * 2 - 16) / 2
    for idx, (label, name) in enumerate(labels):
        col = idx % 2
        if idx and col == 0:
            y -= 26
        x = margin + col * (field_width + 16)
        c.setFillColor(MUTED)
        c.setFont('Helvetica-Bold', 7.5)
        c.drawString(x, y, label.upper())
        field(c, name, x, y - 16, field_width, height=12)
    y -= 42

    for index, (heading, prompt) in enumerate(data['prompts'], 1):
        prompt_width = width - margin * 2 - 48
        prompt_size = 7.8
        prompt_leading = 9.2
        prompt_lines = wrap_lines(prompt, prompt_width, 'Helvetica', prompt_size)
        card_height = 59 + max(0, len(prompt_lines) - 2) * prompt_leading
        if y - card_height < 75:
            c.showPage()
            draw_header(c, data['title'], width, height, margin, continuation=True)
            y = height - 112
        c.setFillColor(white)
        c.setStrokeColor(RULE)
        c.roundRect(margin, y - card_height, width - margin * 2, card_height, 3, fill=1, stroke=1)
        c.setFillColor(NAVY)
        c.circle(margin + 17, y - 17, 10.5, fill=1, stroke=0)
        c.setFillColor(CREAM)
        c.setFont('Helvetica-Bold', 8)
        c.drawCentredString(margin + 17, y - 19.6, f'{index:02d}')
        c.setFillColor(NAVY)
        c.setFont('Times-Bold', 12.1)
        c.drawString(margin + 37, y - 15, heading)
        prompt_end = draw_wrapped(c, prompt, margin + 37, y - 27, prompt_width, size=prompt_size, leading=prompt_leading, color=MUTED)
        note_y = prompt_end - 1.5
        field_y = note_y - 6.5
        c.setFillColor(INK)
        c.setFont('Helvetica', 7.6)
        c.drawString(margin + 37, note_y, 'Decision note:')
        field(c, f'step_{index}_note', margin + 103, field_y, width - margin * 2 - 116, height=10.5)
        c.acroForm.checkbox(name=f'step_{index}_ready', x=width - margin - 17, y=field_y, size=10, buttonStyle='check', borderColor=GOLD, fillColor=white, textColor=NAVY, forceBorder=True)
        y -= card_height + 6

    c.setFillColor(MUTED)
    c.setFont('Helvetica', 7.5)
    c.drawString(margin, 29, 'Use this checklist to structure a decision. It does not replace site-specific technical, financial, legal, or procurement review.')
    c.drawRightString(width - margin, 29, 'enduringadvantage.com')
    c.save()
    return path


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    generated = [make_pdf(key, data) for key, data in VARIANTS.items()]
    for path in generated:
        print(path)


if __name__ == '__main__':
    main()
