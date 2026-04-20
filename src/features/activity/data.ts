export type ActivityStatus = 'settled' | 'posted' | 'pending';

export type ActivityItem = {
  merchant: string;
  category: string;
  amount: string;
  status: ActivityStatus;
};

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { merchant: 'Whole Foods Market', category: 'Groceries', amount: '-$84.63', status: 'settled' },
  { merchant: 'Acme Payroll', category: 'Income', amount: '+$3,250.00', status: 'posted' },
  { merchant: 'Transit Pass', category: 'Transport', amount: '-$45.00', status: 'pending' },
];

export function matchesSearch(item: ActivityItem, query: string): boolean {
  if (!query.trim()) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return (
    item.merchant.toLowerCase().includes(normalizedQuery) ||
    item.category.toLowerCase().includes(normalizedQuery) ||
    item.status.toLowerCase().includes(normalizedQuery)
  );
}
