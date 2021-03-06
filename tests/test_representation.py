"""Unit testing of nugget generators functionality."""

from regraph import print_graph

from kami import (Protoform, Region, RegionActor, Residue,
                  Site, SiteActor, State)
from kami import (Modification,
                  Binding,
                  SelfModification,
                  LigandModification,
                  AnonymousModification)


class TestRepresentation(object):
    """Test class for black box functionality."""

    def __init__(self):
        uniprotid = "P00533"
        simple_region = Region("SH2")
        regions = [simple_region]

        sites = [Site("pY")]

        residues = [
            Residue("Y", 100),
            Residue("S", 155, State("phosphorylation", True))]

        states = [State("activity", True), State("phosphorylation", True)]

        bounds = [
            SiteActor(protoform=Protoform("Q07890"), site=Site("binding_site")),
            Protoform("P00519")]

        self.protoform = Protoform(
            uniprotid,
            regions=regions,
            residues=residues,
            sites=sites,
            states=states,
            bound_to=bounds,
            hgnc_symbol="EGFR",
            synonyms=["EGFR", "Epidermal growth factor receptor"])

        self.enzyme_gene = Protoform("Q07890")

        self.enzyme_site_actor = SiteActor(
            protoform=self.enzyme_gene,
            region=Region("Pkinase"),
            site=Site("tail"))

        self.substrate_gene = Protoform("P00519")
        self.substrate_region_actor = RegionActor(
            protoform=self.substrate_gene,
            region=Region("SH2"))

        self.residue_mod_target = Residue("Y", 100, State("activity", False))

    def test_complex_gene(self):
        print(self.protoform)
        print(self.protoform.__repr__())

    def test_modification(self):
        mod = Modification(
            enzyme=self.enzyme_site_actor,
            substrate=self.substrate_region_actor,
            target=self.residue_mod_target
        )
        print(mod)
        print(mod.__repr__())

    def test_automodification(self):
        automod = SelfModification(
            enzyme=self.enzyme_site_actor,
            target=self.residue_mod_target,
            value=True,
            substrate_region=Region("SH2")
        )
        print(automod)
        print(automod.__repr__())

    def test_transmodification(self):
        mod = LigandModification(
            enzyme=self.enzyme_site_actor,
            substrate=self.substrate_region_actor,
            target=self.residue_mod_target,
            substrate_bnd_region=Region("SH2"),
            enzyme_bnd_site=Site("pY")
        )
        print(mod)
        print(mod.__repr__())

    def test_anonymousmod(self):
        mod = AnonymousModification(
            substrate=self.substrate_region_actor,
            target=self.residue_mod_target)
        print(mod)
        print(mod.__repr__())

    def test_binding(self):
        bnd = Binding(
            self.substrate_region_actor,
            self.enzyme_site_actor)
        print(bnd)
        print(bnd.__repr__())
