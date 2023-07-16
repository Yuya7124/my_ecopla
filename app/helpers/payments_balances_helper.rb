module PaymentsBalancesHelper
  def edit_link_for_date(date)
    edit_payments_balance_path(date: date)
  end
end