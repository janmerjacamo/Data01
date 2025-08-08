/** @odoo-module */

import { KanbanController } from "@web/views/kanban/kanban_controller";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, onWillStart } from "@odoo/owl";

export class CrmSummaryController extends KanbanController {
    setup() {
        super.setup();
        this.model = useService("orm");
        this.state = useState({
            total: 0,
            amount: 0.0,
            dateStart: "",
            dateEnd: ""
        });
    }

    async updateSummary() {
        const domain = [["type", "=", "opportunity"]];
        if (this.state.dateStart) domain.push([["create_date", ">=", this.state.dateStart]]);
        if (this.state.dateEnd) domain.push([["create_date", "<=", this.state.dateEnd]]);

        const data = await this.model.call("crm.lead", "read_group", [domain, ["expected_revenue"], []]);
        this.state.total = data.length;
        this.state.amount = data.reduce((sum, d) => sum + (d.expected_revenue || 0), 0);
    }

    async onDateChange(ev) {
        const { name, value } = ev.target;
        this.state[name] = value;
        await this.updateSummary();
    }
}

registry.category("views").add("crm_kanban_summary", {
    ...registry.category("views").get("kanban"),
    Controller: CrmSummaryController,
});
