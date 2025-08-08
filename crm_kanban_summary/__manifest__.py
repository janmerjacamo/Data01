{
    "name": "CRM Kanban Summary",
    "version": "16.0.1.0.0",
    "depends": ["crm", "web"],
    "author": "Janmer Jácamo",
    "category": "CRM",
    "description": "Kanban summary bar for total opportunities and amount with date range filter.",
    "data": [
        "views/crm_lead_kanban_view.xml"
    ],
    "assets": {
        "web.assets_backend": [
            "crm_kanban_summary/static/src/js/kanban_summary.js",
            "crm_kanban_summary/static/src/xml/kanban_summary.xml"
        ]
    },
    "installable": True,
    "application": False,
    "auto_install": False
}
