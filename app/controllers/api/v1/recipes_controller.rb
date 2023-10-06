class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy]

  def index
    recipes = Recipe.all.order(created_at: :desc)
    render json: recipes
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
      SlackTestJob.perform_now("created", recipe)
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    render json: @recipe
  end

  def destroy
    SlackTestJob.perform_now("deleted", @recipe)
    @recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  private

  def recipe_params
    params.permit(:name, :image, :ingredients, :instruction)
  end

  def set_recipe
    p params
    @recipe = Recipe.find(params[:id])
  end

end
