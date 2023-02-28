from Action import Action

class Etat:
    
    def __init__(self, nom:str, valeur:float|int=0) -> None:
        self.nom = nom
        self.valeur = valeur
        self.actions = dict()
        
    def set_actions(self, mouvs:dict):
        self.actions += mouvs
        
    def add_action(self, action:Action):
        self.actions[action.nom] = action