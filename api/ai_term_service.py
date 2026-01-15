from datetime import date

from ai_term_repository import AITermRepository


class AITermService:
    def __init__(self, ai_term_repository: AITermRepository):
        self.aiter_repository = ai_term_repository
        self.start_date = date(2026, 1, 15)

    def get_today_ai_term(self, user_id: str):
        print(user_id)  # 지금은 별 의미가 없는 값
        index = self.get_today_index()

        print("today index: ", index)

        return self.aiter_repository.get_term_by_id(index)

    def get_today_index(self):
        day_index = (date.today() - self.start_date).days

        return day_index % len(self.aiter_repository.term_list)
