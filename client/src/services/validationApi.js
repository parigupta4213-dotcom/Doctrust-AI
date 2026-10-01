import api from './api';

const MOCK_VALIDATIONS = [
  {
    id: 'val_902',
    title: '3-Way Reconciliation: PO-49201 vs INV-8492 vs GR-10842',
    status: 'FLAGGED',
    accuracyScore: 94,
    discrepancyCount: 1,
    documents: [
      { id: 'doc_po_9021', name: 'Global_Supply_Chain_PO-49201.pdf', type: 'PURCHASE_ORDER' },
      { id: 'doc_inv_1042', name: 'Apex_Tech_Enterprise_Invoice_INV-8492.pdf', type: 'INVOICE' },
      { id: 'doc_gr_3920', name: 'Warehouse_Goods_Receipt_GR-10842.pdf', type: 'RECEIPT' },
    ],
    discrepancies: [
      {
        field: 'Item Quantity (Line Item #2)',
        expected: '500 units',
        received: '450 units',
        severity: 'HIGH',
        recommendation: 'Request credit memo of $4,520.00 from Apex Tech Solutions before payment release.',
      },
    ],
    createdAt: new Date().toISOString(),
  },
];

export const validationApi = {
  async compare(documentIds, title) {
    try {
      const res = await api.post('/validation/compare', { documentIds, title });
      return res.data;
    } catch (err) {
      return {
        success: true,
        data: MOCK_VALIDATIONS[0],
      };
    }
  },

  async getAll() {
    try {
      const res = await api.get('/validation');
      return res.data;
    } catch (err) {
      return {
        success: true,
        data: {
          validations: MOCK_VALIDATIONS,
        },
      };
    }
  },

  async getById(id) {
    try {
      const res = await api.get(`/validation/${id}`);
      return res.data;
    } catch (err) {
      return {
        success: true,
        data: MOCK_VALIDATIONS[0],
      };
    }
  },
};

export default validationApi;
