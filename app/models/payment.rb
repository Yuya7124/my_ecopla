class Payment < ActiveHash::Base
  self.data = [
    { id: 0, name: '---' },
    { id: 1, name: '現金' },
    { id: 2, name: 'クレジット決済' },
    { id: 3, name: '口座振込' }
  ]
 
  include ActiveHash::Associations
  has_many :payments_balances
end