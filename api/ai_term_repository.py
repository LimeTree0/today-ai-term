import json


class AITermRepository:
    def __init__(self):
        file_path = "terms.json"

        with open(file_path, "r", encoding="utf-8") as file:
            json_load = json.load(file)

            self.term_list = json_load

    def get_term_by_id(self, term_id):
        return self.term_list[term_id]