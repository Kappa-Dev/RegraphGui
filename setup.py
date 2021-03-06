"""Setup of KAMI."""

from setuptools import setup

setup(name='kami',
      version='1.2',
      description='Knowledge Aggregator and Model Instantiator',
      author='Russ Harmer, Sebastien Legare, Eugenia Oshurko',
      license='MIT License',
      packages=['kami',
                'kami.exporters',
                'kami.importers',
                'kami.aggregation',
                'kami.resources',
                'kami.utils',
                'kami.data_structures',
                'anatomizer',
                'kamiql'],
      package_data={
          'anatomizer': ['resources/*'],
      },
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          "indra",
          "flask",
          "flex",
          "lxml",
          "jpype1"
      ])
